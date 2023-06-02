import casual from "casual";

export const baselineMocks = {
    URL: () => "https://www.google.com",
    Int: () => casual.integer(1,20),
    Date: () => "2023-06-02",
    DateTime: () => "2023-06-02T14:45:30Z",
    LanguageTag: () => "en-US",
    _Any: () => "Lorem Ipsum" 
}