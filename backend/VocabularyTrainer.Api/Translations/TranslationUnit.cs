using System.Text.Json;

namespace VocabularyTrainer.Api.Translations;

public sealed class TranslationUnit
{
    public required int Id { get; init; }

    public required string Name { get; init; }

    public List<Translation> Translations { get; init; } = new();

    public static async Task<TranslationUnit> LoadAsync(int id, CancellationToken cancellationToken = default)
    {
        var unitDataPath = $@"data\unit{id}.json";

        return JsonSerializer.Deserialize<TranslationUnit>(await File.ReadAllTextAsync(unitDataPath, cancellationToken))
               ?? throw new ArgumentException($"TranslationUnit with given ID {id} could not be loaded", nameof(id));
    }
}