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
    public async Task<TranslationUnit> GetAsync(int id, CancellationToken cancellationToken)
        => await TranslationUnit.LoadAsync(id, $@"data\unit{id}.json", cancellationToken);

    [HttpGet(Name = "All TranslationUnits")]
    public async Task<TranslationUnitInfo[]> GetAllAsync(CancellationToken cancellationToken)
    {
        var units = new List<TranslationUnit>();
        foreach (var unitDataPath in Directory.GetFiles(@"data\", "*.json"))
        {
            var id = int.Parse(Path.GetFileNameWithoutExtension(unitDataPath).Substring("unit".Length));
            units.Add(await TranslationUnit.LoadAsync(id, unitDataPath, cancellationToken));
        }

        return units.Select(x => new TranslationUnitInfo(x.Id, x.Name)).ToArray();
    }
}