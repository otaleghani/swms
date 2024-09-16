/** Local components */
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardContent 
} from "@/components/card"

interface CardWrapperProps {
  Header: React.FunctionComponent;
  Content: React.FunctionComponent;
  Footer?: React.FunctionComponent;
}

export default function CardWrapper({
  Header,
  Content,
  Footer
}: CardWrapperProps) {
  return (
    <Card className="mb-4"> 
      <CardHeader className="pb-4">
        <Header />
      </CardHeader>
      <CardContent className="text-sm">
        <Content />
      </CardContent>
      { Footer && (
        <CardFooter className="gap-2 text-sm">
          <Footer />
        </CardFooter>
      )}
    </Card>
  )
}
