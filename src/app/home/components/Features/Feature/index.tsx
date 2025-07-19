import { 
  BadgeCheck, 
  FlaskConical, 
  Hourglass, 
  Sparkle, 
  Telescope 
} from "lucide-react";
import Badge from "../Badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  type AccentColor, 
  getAccentClasses, 
} from "@/config/colors";

export type FeatureProps = {
  title: string;
  description: string;
  accent?: AccentColor;
  icon: React.ReactNode;
  link?: string;
  isAvailable?: boolean;
  isComingSoon?: boolean;
  isBeta?: boolean;
  isNew?: boolean;
  isFutureDevelopment?: boolean;
};

export default function Feature(props: FeatureProps) {
  const {
    title,
    description,
    icon,
    accent = 'gray',
    link,
    isAvailable = false,
    isComingSoon = false,
    isBeta = false,
    isNew = false,
    isFutureDevelopment = false
  } = props;

  const colorClasses = getAccentClasses(accent);

  return (
    <div 
      className={cn(
        "border rounded-lg p-6 shadow-md transition-transform transform hover:scale-105",
        colorClasses.bg,
        colorClasses.border,
        colorClasses.darkBg,
        colorClasses.darkBorder
      )}
    >
      <div 
        className={cn(
          "flex items-center mb-4",
          colorClasses.text,
          colorClasses.darkText
        )}
      >
        {icon}
        <h3 
          className="ml-2 text-lg font-semibold w-5/6" 
          title={title}
        >
          {title}
        </h3>
      </div>
      
      <p className="text-slate-700 dark:text-slate-100 mb-4">
        {description}
      </p>
      
      <div className="flex items-center space-x-2">
        {isAvailable && (
          <Badge 
            text="Disponível" 
            icon={<BadgeCheck className="h-4 w-4" />} 
            accent="green" 
          />
        )}
        {isComingSoon && (
          <Badge 
            text="Em Breve" 
            icon={<Hourglass className="h-4 w-4" />} 
            accent="yellow" 
          />
        )}
        {isBeta && (
          <Badge 
            text="Beta" 
            icon={<FlaskConical className="h-4 w-4" />} 
            accent="teal" 
          />
        )}
        {isNew && (
          <Badge 
            text="Novo" 
            icon={<Sparkle className="h-4 w-4" />} 
            accent="violet" 
          />
        )}
        {isFutureDevelopment && (
          <Badge 
            text="Desenvolvimento Futuro" 
            icon={<Telescope className="h-4 w-4" />} 
            accent={"orange"} 
          />
        )}
      </div>
      
      {link && isAvailable && (
        <div className="mt-4 px-8">
          <Link href={link} rel="noopener noreferrer">
            <Button
              variant="outline"
              className={cn(
                "w-full",
                colorClasses.text,
                colorClasses.border,
                colorClasses.darkText,
                colorClasses.darkBorder
              )}
            >
              Comece a Usar
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}