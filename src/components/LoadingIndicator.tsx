export default function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center py-8">
      <div
        className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"
        data-testid="loading-spinner"
      ></div>
    </div>
  );
}
