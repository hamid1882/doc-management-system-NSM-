import MainContent from "./components/MainContent";
import MainTopSection from "./components/MainTopSection";

export default function Home() {
  return (
    <div className="bg-primary-100 w-full h-full">
      <MainTopSection />
      <MainContent />
    </div>
  );
}
