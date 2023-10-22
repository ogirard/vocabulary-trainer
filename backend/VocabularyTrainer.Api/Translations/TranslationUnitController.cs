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
}