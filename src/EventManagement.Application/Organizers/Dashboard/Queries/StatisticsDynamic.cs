namespace EventManagement.Application.Organizers.Dashboard.Queries;

internal static class StatisticsDynamic
{
    public const string Up = "Up";

    public const string Down = "Down";

    public const string Equal = "Equal";

    public static string GetDynamic(double? change) => change switch
    {
        > 0 => Up,
        < 0 => Down,
        _ => Equal
    };
}
