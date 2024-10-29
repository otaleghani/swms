/** Local components*/
import { 
  CardTitle, 
  CardDescription, 
} from "@/app/ui/components/card"

interface CardWrapperHeaderProps {
  title: string;
  description?: string;
}

export default function CardWrapperHeader({
  title,
  description
}: CardWrapperHeaderProps) {
  return (
    <>
      <CardTitle>
        <span className="text-2xl font-semibold tracking-tight">
          {title}
        </span>
      </CardTitle>
      { description && (
        <CardDescription>
          {description}
        </CardDescription>
      )}
    </>
  )
}
