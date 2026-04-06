export function AssistantEmptyState() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="mt-4 flex flex-col items-center text-sm">
        <div className="app-assistant-toolbar mx-8 text-center text-xs">
          Responses are generated using AI and may contain mistakes.
        </div>
      </div>
    </div>
  );
}
