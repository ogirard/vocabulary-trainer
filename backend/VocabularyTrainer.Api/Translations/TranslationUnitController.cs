using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace VocabularyTrainer.Api.Translations;

[ApiController]
[Route("[controller]")]
public class TranslationUnitController : ControllerBase
{
    private readonly ILogger<TranslationUnitController> logger;

    public TranslationUnitController(ILogger<TranslationUnitController> logger)
    {
        this.logger = logger;
    }

    [HttpGet("{id:int}", Name = "TranslationUnit by ID")]
    public async Task<IActionResult> GetAsync(int id, CancellationToken cancellationToken)
    {
        var filePath = $"./data/unit{id}.json";
        if (!System.IO.File.Exists(filePath))
        {
            return NotFound($"Could not find unit with ID={id}");
        }

        return Ok(await TranslationUnit.LoadAsync(id, filePath, cancellationToken));
    }

    [HttpGet(Name = "All TranslationUnits")]
    public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
    {
        var units = new List<TranslationUnit>();
        foreach (var unitDataPath in Directory.GetFiles(@"data\", "*.json"))
        {
            var id = int.Parse(Path.GetFileNameWithoutExtension(unitDataPath).Substring("unit".Length));
            units.Add(await TranslationUnit.LoadAsync(id, unitDataPath, cancellationToken));
        }

        return Ok(units.Select(x => new TranslationUnitInfo(x.Id, x.Name)).ToArray());
    }

    [HttpPost("/TranslationUnit/DumpCsv", Name = "Dump Translations as CSV")]
    public async Task<IActionResult> GetAllAsCsvAsync(CancellationToken cancellationToken)
    {
        var units = new List<string>();
        foreach (var unitDataPath in Directory.GetFiles(@"data\", "*.json"))
        {
            var id = int.Parse(Path.GetFileNameWithoutExtension(unitDataPath).Substring("unit".Length));
            var unit = await TranslationUnit.LoadAsync(id, unitDataPath, cancellationToken);
            var csvPath = unitDataPath.Replace(".json", ".csv");
            await System.IO.File.WriteAllTextAsync(csvPath, Encoding.UTF8.GetString(Encoding.UTF8.GetPreamble()) +
                                                            "English;German" + Environment.NewLine + string.Join(
                                                                Environment.NewLine,
                                                                unit.Translations.Select(t =>
                                                                    $"{t.English};{t.German}")), Encoding.UTF8,
                cancellationToken);
            units.Add($"Dumped {unit.Name} to {csvPath}");
        }

        return Ok(new { Units = units });
    }
}