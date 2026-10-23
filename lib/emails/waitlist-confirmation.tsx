import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface WaitlistConfirmationEmailProps {
  email: string;
}

export default function WaitlistConfirmationEmail({
  email,
}: WaitlistConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the waitlist!</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4">
            <Section className="mx-auto max-w-[600px]">
              <Heading className="text-2xl font-semibold text-gray-900">
                Welcome to the Waitlist!
              </Heading>
              <Text className="mt-4 text-base text-gray-600">
                Thanks for joining our waitlist! We're excited to have you on
                board.
              </Text>
              <Text className="mt-4 text-base text-gray-600">
                We'll keep you updated on our progress and let you know as soon
                as we launch.
              </Text>
              <Text className="mt-8 text-sm text-gray-500">
                Best regards,
                <br />
                The PRYDD Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
