import mockPreview from "@/assets/images/features_page_mock_preview.png";

export function FeaturesDashboardPreview() {
    return (
        <section className="bg-[#F7F9FB] pb-20 lg:pb-[100px]">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-20">
                <img
                    src={mockPreview}
                    alt="KinGuard dashboard preview"
                    className="block h-auto w-full"
                    draggable={false}
                />
            </div>
        </section>
    );
}
