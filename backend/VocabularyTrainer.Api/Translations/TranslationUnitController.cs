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

    [HttpGet("{id:int}", Name = "TranslationUnit")]
    public async Task<TranslationUnit> GetAsync(int id, CancellationToken cancellationToken)
        => await TranslationUnit.LoadAsync(id, cancellationToken);
}