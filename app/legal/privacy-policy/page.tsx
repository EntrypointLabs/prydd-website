import type { Metadata } from "next"

import { LegalLead, LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Prydd app and website.",
  alternates: {
    canonical: "/legal/privacy-policy",
  },
}

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="26th November 2026">
      <LegalSection>
        This Privacy Policy explains how Entrypoint Labs, Inc. (
        <LegalLead>&quot;we,&quot;</LegalLead> <LegalLead>&quot;us,&quot;</LegalLead> or{" "}
        <LegalLead>&quot;our&quot;</LegalLead>), the team building Prydd, handles information in
        connection with Prydd: the website at prydd.co, the Prydd mobile
        application, and related services (together, the{" "}
        <LegalLead>&quot;Service&quot;</LegalLead>).
      </LegalSection>

      <LegalSection>
        <LegalLead>1. Who We Are.</LegalLead> Entrypoint Labs, Inc. is the
        team building Prydd, a dollar account for everyday life. Prydd lets
        you hold a balance in U.S. dollars, add money in your local currency,
        send to other Prydd accounts, saved contacts, Solana addresses, and
        local bank accounts, swap and hold other digital assets, earn with
        third-party lending providers, and pay online merchants with Pay
        with Prydd.
      </LegalSection>

      <LegalSection>
        <LegalLead>2. Information We Collect.</LegalLead> We collect the
        following categories of information in connection with the Service:
      </LegalSection>

      <LegalSection>
        <LegalLead>Account and device information.</LegalLead> When you
        create an account, we collect your email address, which we use to
        sign you in and to help you recover your account, and we receive a
        public key and credential identifier from your passkey and from the
        key secured on your phone. The biometric data used to unlock them
        (such as a fingerprint or face scan) never leaves your device and is
        not something we ever see or store. We hold one of your
        account&apos;s three keys in encrypted form for recovery only. If
        you enable notifications, we store a push notification token for
        your device.
      </LegalSection>

      <LegalSection>
        <LegalLead>Identity information.</LegalLead> We do not require
        identity verification to open an account. If you raise your limits
        for adding or sending local currency, our payment partner verifies
        your identity, for example with your bank verification number and a
        code sent to your phone. We receive the result of that check, not
        your bank verification number, and we do not store it. We may
        request further verification as described in our Terms of Service.
      </LegalSection>

      <LegalSection>
        <LegalLead>Balance and transaction information.</LegalLead> We
        maintain a record of your Balance and of transfers you send or
        receive, including the counterparty address, amount, and time, as
        well as swaps, Earn deposits and withdrawals, and payments to
        merchants, including the merchant&apos;s name. Contacts you save are
        kept on your device. When you add money in local currency or send to
        a bank account, we and our payment partners process the information
        needed to complete it, such as the bank account details you provide.
        Transfers settle on the Solana blockchain, a public ledger; the
        resulting transaction data is publicly visible on that network
        independent of anything we do.
      </LegalSection>

      <LegalSection>
        <LegalLead>Compliance and screening information.</LegalLead> We use
        blockchain analytics tools to screen the blockchain transactions
        associated with your account for exposure to sanctioned parties,
        suspected money laundering, or other financial crime risk
        indicators, as described in our Terms of Service. This screening
        produces information about your account and transactions, such as a
        risk flag or match against a watchlist.
      </LegalSection>

      <LegalSection>
        <LegalLead>Usage and log information.</LegalLead> Our hosting
        provider and app infrastructure generate standard logs for requests
        made to the Service, which may include an IP address, device and app
        version information, and the time of the request. We use
        privacy-friendly analytics, described in Section 4, to understand
        aggregate usage of the website.
      </LegalSection>

      <LegalSection>
        <LegalLead>Former waitlist information.</LegalLead> The prydd.co
        website previously let visitors join a waitlist for early access by
        submitting an email address. The waitlist is now closed and the
        website no longer collects email addresses. If you joined it, we
        still hold the email address you submitted and use it only to tell
        you that the app is available.
      </LegalSection>

      <LegalSection>
        <LegalLead>Communications.</LegalLead> If you contact us by email or
        on X using the details in Section 10, we see whatever information
        you choose to include in that message.
      </LegalSection>

      <LegalSection>
        <LegalLead>3. How We Use Information.</LegalLead> We use the
        information described in Section 2 to: operate your account and
        process transfers and funding requests; tell former waitlist members
        that the app is available; secure the Service and
        prevent fraud, unauthorized access, and abuse; comply with
        applicable law; communicate with you about your account, security,
        or changes to the Service; and diagnose technical problems and
        improve the Service. We do not sell information collected through
        the Service, and we do not use it to build advertising profiles.
      </LegalSection>

      <LegalSection>
        <LegalLead>4. Cookies.</LegalLead> The website uses Vercel Analytics
        to measure aggregate traffic. Vercel Analytics is designed to avoid
        cross-site tracking and does not use cookies to identify individual
        visitors across sites. Beyond what this analytics service strictly
        requires to function, the website does not set tracking cookies or
        use similar tracking technologies.
      </LegalSection>

      <LegalSection>
        <LegalLead>5. Third-Party Services.</LegalLead> The Service is hosted
        on Vercel&apos;s infrastructure, which processes logs and analytics
        data on our behalf. We use Resend to send transactional email. We
        work with payment partners to let you add money in local currency,
        send to bank accounts, and verify your identity when you raise your
        limits; those partners process the information necessary to complete
        a transaction under their own privacy practices. Key management
        providers secure two of your account&apos;s keys, and lending and
        liquidity providers carry out Earn and Swap. We also use blockchain
        analytics providers to screen blockchain transactions for compliance
        purposes, as described in Section 2. When you pay a merchant with Pay
        with Prydd, the merchant receives the payment amount and reference
        it needs to fulfil your order. Transfers settle on the Solana
        network, a public blockchain that we do not operate or control. Each of these third parties has its own
        privacy practices that this Policy does not cover.
      </LegalSection>

      <LegalSection>
        <LegalLead>6. Data Sharing.</LegalLead> We do not sell your personal
        information. We may share information described in Section 2 with:
        service providers who help us operate the Service, such as hosting,
        email, key management, and banking or payment partners, under
        obligations to
        protect it; our blockchain analytics and transaction screening
        providers, so they can screen your account and transactions as
        described in Section 2; law enforcement or regulators where
        required by law, where a screening provider flags a transaction, or
        to investigate fraud, security incidents, or violations of our
        Terms of Service; and another party in connection with a merger,
        acquisition, or sale of assets, subject to that party&apos;s
        continued obligations under this Policy.
      </LegalSection>

      <LegalSection>
        <LegalLead>7. Data Retention.</LegalLead> We retain account and
        transaction information for as long as your account is active, and
        for a reasonable period afterward as needed for security, fraud
        prevention, dispute resolution, or legal and financial recordkeeping
        obligations. We retain a former waitlist email address until you either
        create an account or ask us to delete it, whichever comes first. We
        retain server logs only as long as needed for security and
        operational purposes, after which they are deleted or aggregated in
        a way that no longer identifies a specific person. Because transfers
        settle on the Solana blockchain, we cannot delete the blockchain
        record of a completed transaction; that record exists independently
        on a public, immutable ledger.
      </LegalSection>

      <LegalSection>
        <LegalLead>8. Your Rights.</LegalLead> Depending on where you are
        located, you may have rights to request access to, correction of, or
        deletion of personal information we hold about you, or to close your
        account. To make a request, contact us using the details in Section
        10 and describe the information involved as specifically as you can;
        we will respond within a reasonable time and may ask you to verify
        your request before acting on it. Some information, such as records
        we must keep for legal or financial recordkeeping purposes and data
        that exists on the Solana blockchain, cannot be deleted even upon
        request.
      </LegalSection>

      <LegalSection>
        <LegalLead>9. Children.</LegalLead> The Service is not directed to
        children and is not available to anyone under 18. We do not
        knowingly collect personal information from children.
      </LegalSection>

      <LegalSection>
        <LegalLead>10. Contact.</LegalLead> Questions about this Policy, or
        requests related to your information, can be sent to us by email at{" "}
        <a
          href="mailto:support@prydd.co"
          className="font-semibold text-foreground underline"
        >
          support@prydd.co
        </a>{" "}
        or on X at{" "}
        <a
          href="https://x.com/pryddfinance"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-foreground underline"
        >
          @pryddfinance
        </a>
        .
      </LegalSection>

      <LegalSection>
        <LegalLead>11. Changes to This Policy.</LegalLead> We may update this
        Policy from time to time by posting a revised version with a new
        &quot;Last Updated&quot; date. For material changes, we will make
        reasonable efforts to notify you in the app or by email before they
        take effect. Continued use of the Service after a revision is posted
        constitutes your acceptance of it.
      </LegalSection>
    </LegalPage>
  )
}
