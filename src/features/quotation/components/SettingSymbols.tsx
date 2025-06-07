import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "./SettingSection";

type SettingsSymbolsProps = {
  symbols: string[];
};

export default function SettingSymbols({ symbols }: SettingsSymbolsProps) {
  return (
    <Section>
      <Section.Title>기호모음</Section.Title>
      <Section.Content>
        <div className="mb-3 flex flex-wrap gap-2 rounded-md border p-3">
          {symbols.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
            >
              {item}
              <button type="button">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div>
          <Button variant="outline">추가</Button>
        </div>
      </Section.Content>
    </Section>
  );
}
