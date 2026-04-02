import LanguageCard from "../components/ui/LanguageCard";

export default function page() {
  return (
    <div className=" m-20 font-Inter">
      
      <h1 className="text-2xl font-semibold  mb-10 tracking-wide ">
        Choose a language to learn
      </h1>

      <div className="grid grid-cols-2 gap-20">
        
        <LanguageCard
          title="Spanish"
          description="Español"
          countryCode="ES"
          href="/spanish"
          color="#FABD00"
        />
        <LanguageCard
          title="Japanese"
          description="日本語"
          countryCode="JP"
          href="/japanese"
          color="#BC002D"
        />

      </div>
    </div>
  );
}