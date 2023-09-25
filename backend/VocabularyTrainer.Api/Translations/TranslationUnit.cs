using System.Text.Json;

namespace VocabularyTrainer.Api.Translations;

public sealed class TranslationUnit
{
    public required int Id { get; init; }

    public required string Name { get; init; }

    public List<Translation> Translations { get; init; } = new();

    public static async Task<TranslationUnit> LoadAsync(int id, string unitDataPath, CancellationToken cancellationToken = default)
    {
        return JsonSerializer.Deserialize<TranslationUnit>(await File.ReadAllTextAsync(unitDataPath, cancellationToken))
               ?? throw new ArgumentException($"TranslationUnit with given ID {id} could not be loaded", nameof(id));
    }
}

public record TranslationUnitInfo(int Id, string Name);