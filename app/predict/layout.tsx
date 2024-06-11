import { OnbordaProvider, Onborda } from "onborda";
import { OnbordaSteps } from "@/lib/onborda/steps";
import OnbordaOverlay from "@/components/OnbordaOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OnbordaProvider>
      <Onborda
        steps={OnbordaSteps}
        shadowOpacity="0.8"
        cardComponent={OnbordaOverlay}
      >
        {children}
      </Onborda>
    </OnbordaProvider>
  );
}
