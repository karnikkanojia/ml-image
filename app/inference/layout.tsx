import { OnbordaProvider, Onborda } from "onborda";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <OnbordaProvider>
        {children}
    </OnbordaProvider>
  );
}
