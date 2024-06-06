import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link";
import Image from "next/image";

const Welcome: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <Link href="https://www.mi4people.org" target="_blank">
          <span className="flex justify-center mb-4">
            <Image
              src="/mi4people.png"
              alt="MI4People Logo"
              width={100}
              height={100}
              className="text-center"
            />
          </span>
        </Link>
        <CardTitle>
          Welcome to X-Ray Insight: AI-Powered Disease Probability Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
          Welcome to X-Ray Insight, an innovative tool designed to democratize
          access to advanced medical technologies through the power of
          artificial intelligence. This platform is a testament to
          <span className="m-[5px] font-bold hover:underline hover:text-black text-shadow">
            <Link href="https://www.mi4people.org" target="_blank">
              MI4People&apos;s
            </Link>
          </span>
          commitment to &quot;AI for good,&quot; focusing on making cutting-edge
          medical diagnostics accessible to all, especially in developing
          countries where such technology can have a transformative impact on
          healthcare. Users of X-Ray Insight can upload multiple X-ray images to
          receive AI-driven assessments on the probability of 14 possible
          conditions. This service leverages a sophisticated AI model based on
          research, as detailed in the paper available at{" "}
          <Link
            href="https://doi.org/10.48550/arXiv.2111.00595"
            className="font-bold hover:underline hover:text-black"
          >
            https://doi.org/10.48550/arXiv.2111.00595
          </Link>
          . Our technology utilizes Gradient-weighted Class Activation Mapping
          (Grad-CAM) to visually highlight the regions within the image that
          influenced the AI&apos;s assessments, thereby enhancing the clarity
          and usefulness of the analysis. Created and hosted by MI4People, X-Ray
          Insight is part of our broader mission to apply AI technologies for
          societal benefit. By bridging the gap between advanced AI research and
          practical applications in medical settings, we aim to empower
          healthcare professionals worldwide with tools that are not only
          innovative but also accessible and easy to use. This initiative is
          particularly aimed at supporting medical practitioners in developing
          countries, providing them with access to diagnostic tools that were
          previously out of reach due to technological and financial
          constraints. This application is more than just a tool; it&apos;s a
          part of MI4People&apos;s vision to harness the potential of AI for
          positive social impact, making significant strides towards leveling
          the playing field in global health.

          <Alert variant="destructive" className="border-none p-0 text-lg">
            <AlertTitle className="mt-4">
              Disclaimer
            </AlertTitle>
            <AlertDescription>
                This web application is intended solely as a tool to assist medical
                professionals in the analysis of X-ray images and does not replace
                the professional judgment of qualified doctors. The information
                provided by this application does not constitute a medical diagnosis
                and should not be interpreted as such. It is imperative that any
                diagnosis and subsequent therapeutic decisions are not based solely
                on the digitally generated results of this application. The
                probabilities of diseases provided by the application are merely
                estimates based on artificial intelligence and cannot guarantee
                accuracy or correctness in individual cases. Users of this
                application are urged to critically examine all findings and results
                and, in every instance, seek the opinion of a specialist. By using
                this application, users acknowledge that the developers bear no
                responsibility for any direct, indirect, incidental, special,
                exemplary, or consequential damages arising from reliance on the
                information provided here. Furthermore, users are responsible for
                ensuring that the images uploaded do not contain any personal
                sensitive data or identifiers before submission. It is the user&apos;s
                responsibility to comply with all applicable privacy and data
                protection laws, including the anonymization of images to remove any
                information that could potentially identify an individual. By
                proceeding to use this application, users agree to this
                responsibility and to the terms outlined above.
            </AlertDescription>
          </Alert>
      </CardContent>
      <CardFooter>
        <Link href="/predict">
          <Button variant="default" size="default">
            Get Started
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

Welcome.displayName = "Welcome"

export default Welcome;
