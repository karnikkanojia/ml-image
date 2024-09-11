import { OnbordaProvider, Onborda } from "onborda";
import { tour } from "@/lib/onborda-steps";
import OnbordaCard from "@/components/OnbordaCard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <OnbordaProvider>
      <Onborda steps={tour} cardComponent={OnbordaCard} shadowOpacity="0.8">
        {children}
      </Onborda>
    </OnbordaProvider>
  );
}
