import { useTranslation } from "react-i18next";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/custom/Select";
import { Globe } from "lucide-react";
import { useEffect } from "react";

const LanguageSwitcherPage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  useEffect(()=>{
    document.body.dir = i18n.dir()
  }, [i18n , i18n.language])

  return (
    <div className="p-4 border-b border-border">
      <Select value={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger className="w-full sm:w-48 flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">
            <span className="flex items-center gap-2">
            English
            </span>
          </SelectItem>
          <SelectItem value="hi">
            <span className="flex items-center gap-2">हिंदी</span>
          </SelectItem>
          <SelectItem value="de">
            <span className="flex items-center gap-2">Deutsch</span>
          </SelectItem>
          <SelectItem value="fr">
            <span className="flex items-center gap-2">Français</span>
          </SelectItem>
          <SelectItem value="ja">
            <span className="flex items-center gap-2">日本語</span>
          </SelectItem>
          <SelectItem value="ar">
            <span className="flex items-center gap-2">العربية</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcherPage;
