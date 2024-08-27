import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/images/Oscar Logo with Text.svg"
          alt="Oscar Logo"
          width={100}
          height={100}
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body1" paragraph>
        1. We value your privacy and are committed to protecting your personal
        data. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use the Oscar Keyboard App.
      </Typography>

      <Typography variant="body1" paragraph>
        2. We collect personal information such as your email address and user
        preferences when you create an account or use the App. We also collect
        information about your usage of the App, such as the features you use,
        the time and duration of your use, and error reports.
      </Typography>

      <Typography variant="body1" paragraph>
        3. We use your information to provide and maintain the App, improve and
        personalize your experience, monitor and analyze usage and trends, send
        you updates, security alerts, and support messages, and comply with
        legal obligations.
      </Typography>

      <Typography variant="body1" paragraph>
        4. We do not share your personal information with third parties except
        with your consent, to comply with legal requirements, or to protect and
        defend our rights and property.
      </Typography>

      <Typography variant="body1" paragraph>
        5. We implement appropriate technical and organizational measures to
        protect your personal data from unauthorized access, use, or disclosure.
      </Typography>

      <Typography variant="body1" paragraph>
        6. We retain your personal data only for as long as necessary to fulfill
        the purposes for which it was collected or as required by law.
      </Typography>

      <Typography variant="body1" paragraph>
        7. Depending on your jurisdiction, you may have the following rights
        regarding your personal data: access to your data, correction of
        inaccurate data, deletion of your data, restriction of processing, and
        data portability.
      </Typography>

      <Typography variant="body1" paragraph>
        8. The App is not intended for use by children under the age of 13. We
        do not knowingly collect personal data from children under 13. If we
        learn that we have collected personal data from a child under 13, we
        will delete that information promptly.
      </Typography>

      <Typography variant="body1" paragraph>
        9. We may update this Privacy Policy from time to time. We will notify
        you of any changes by posting the new Privacy Policy within the App.
        Your continued use of the App after any such changes constitutes your
        acceptance of the new Privacy Policy.
      </Typography>

      <Typography variant="body1" paragraph>
        10. If you have any questions about this Privacy Policy, please contact
        us at{" "}
        <a href="mailto:support.oscar@samyarth.org">
          support.oscar@samyarth.org
        </a>
        .
      </Typography>
    </Container>
  );
}
