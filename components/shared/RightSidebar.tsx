import { CalendarBox } from "@/components/custom/calendar"
import { Card, CardHeader, CardTitle } from "../ui/card";
import { BadgePlus } from "lucide-react";

function RightSidebar() {
  return (
    <section className="rightsidebar">
      <Card className="min-w-[250px]">
        <CardHeader>
          <CardTitle className="text-sm">
            <BadgePlus />
            Sugestões
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
  )
}

export default RightSidebar;