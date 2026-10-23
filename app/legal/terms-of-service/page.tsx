import type { Metadata } from "next"

import { LegalLead, LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for the PRYDD app and website.",
  alternates: {
    canonical: "/legal/terms-of-service",
  },
}

export default function Page() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="28th July 2026">
      <LegalSection>
        This Terms of Service agreement (the <LegalLead>&quot;Agreement&quot;</LegalLead>) governs
        your access to and use of PRYDD, a dollar account product made up of
        the website located at prydd.co, the PRYDD mobile application, and
        related services (together, the <LegalLead>&quot;Service&quot;</LegalLead>), operated by
        Entrypoint Labs, Inc. (<LegalLead>&quot;Entrypoint Labs,&quot;</LegalLead>{" "}
        <LegalLead>&quot;we,&quot;</LegalLead> <LegalLead>&quot;us,&quot;</LegalLead> or{" "}
        <LegalLead>&quot;our&quot;</LegalLead>). By creating an account, accessing, or using the
        Service, you agree to be bound by this Agreement. If you do not
        agree, you should not access or use the Service.
      </LegalSection>

      <LegalSection>
        BY CREATING AN ACCOUNT OR USING THE SERVICE IN ANY WAY, YOU
        ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY
        THIS AGREEMENT IN ITS ENTIRETY.
      </LegalSection>

      <LegalSection>
        <LegalLead>1. Eligibility.</LegalLead> You must be at least 18 years
        old and able to form a binding contract to use the Service. You may
        not use the Service if you are located in, or a citizen or resident
        of, a country or region subject to comprehensive sanctions, or if you
        are listed on any government sanctions or watch list, including
        lists maintained by the U.S. Office of Foreign Assets Control
        (OFAC). You are responsible for ensuring that your use of the
        Service complies with the laws that apply to you wherever you are
        located.
      </LegalSection>

      <LegalSection>
        <LegalLead>2. The Service.</LegalLead> PRYDD lets you hold a balance
        denominated in U.S. dollars (your <LegalLead>&quot;Balance&quot;</LegalLead>), fund that
        Balance from a linked local bank account or payment method, and send
        or receive dollars to or from other PRYDD users by username. Transfers
        between PRYDD users settle using the Solana blockchain. Nothing in
        this Agreement or elsewhere on the Service constitutes financial,
        investment, legal, or tax advice, and any figures, timelines, or
        forward-looking statements — including anything in our litepaper —
        are illustrative only and may change without notice.
      </LegalSection>

      <LegalSection>
        <LegalLead>3. Your Account.</LegalLead> You sign in to PRYDD using a
        passkey tied to your device rather than a password or seed phrase.
        You are responsible for keeping your device and passkey secure and
        for all activity that occurs through your account. Notify us
        immediately at the contact details in Section 16 if you believe your
        account has been accessed without your permission. We are not
        liable for losses caused by your failure to keep your device or
        account credentials secure.
      </LegalSection>

      <LegalSection>
        <LegalLead>4. Identity Verification.</LegalLead> PRYDD does not
        currently require identity verification to create an account or
        hold a Balance. We reserve the right to require you to verify your
        identity — for example, by providing your legal name, date of
        birth, address, or a government-issued ID — at any time, including
        as required by applicable law or if we suspect fraud, and to limit,
        suspend, or close your account if you do not complete verification
        we request.
      </LegalSection>

      <LegalSection>
        <LegalLead>5. Funding and Transfers.</LegalLead> You can add funds to
        your Balance from a linked bank account or supported local payment
        method. Transfers to other PRYDD users are generally intended to
        settle quickly, but we do not guarantee a specific settlement time,
        and we may delay, limit, or decline a transaction to comply with
        law, prevent fraud, or protect the Service. Because transfers settle
        on the Solana blockchain, completed transactions are generally
        irreversible; we cannot reverse, cancel, or recover a transfer once
        it has settled on-chain. You are responsible for making sure you are
        sending funds to the correct recipient.
      </LegalSection>

      <LegalSection>
        <LegalLead>6. Fees.</LegalLead> Entrypoint Labs does not currently
        charge a fee to hold a Balance, fund your account, or send money to
        another PRYDD user. Sending or funding a transfer may still incur a
        minimal network fee — typically a fraction of a cent — charged by
        the Solana network itself to process the transaction, not by us. We
        may introduce our own fees in the future; if we do, we will disclose
        them in the app before you complete an affected transaction, and
        continued use of the Service after a fee takes effect constitutes
        your acceptance of it.
      </LegalSection>

      <LegalSection>
        <LegalLead>7. Not a Bank; No Deposit Insurance.</LegalLead>{" "}
        Entrypoint Labs, Inc. is a software company, not a bank. Your Balance
        is not a deposit account at a bank chartered by any government and
        is not insured by the FDIC or any other deposit insurance scheme
        unless we expressly state otherwise in the app. Funding a Balance
        may involve linking to a bank account or payment method through a
        banking or payment partner; that partner processes the information
        necessary to complete the funding transaction under its own terms
        and privacy practices.
      </LegalSection>

      <LegalSection>
        <LegalLead>8. Assumption of Risk.</LegalLead> Transfers made through
        the Service rely on the Solana blockchain and related infrastructure
        that we do not control. You understand and accept that this
        infrastructure may experience outages, congestion, bugs, or other
        technical issues beyond our control, that blockchain transactions
        are generally irreversible once confirmed, and that use of the
        Service carries technology risks inherent to blockchain-based
        systems. You are responsible for evaluating whether these risks are
        acceptable to you before using the Service.
      </LegalSection>

      <LegalSection>
        <LegalLead>9. Prohibited Uses.</LegalLead> You agree not to use the
        Service to: (a) violate any applicable law or regulation, including
        laws relating to money laundering, terrorist financing, or economic
        sanctions; (b) send or receive funds connected to fraud, illegal
        goods or services, or other unlawful activity; (c) probe, scan, or
        attempt to breach the security of the Service; (d) submit false or
        misleading information, including during any identity verification
        we request; (e) misrepresent your affiliation with Entrypoint Labs;
        or (f) interfere with or disrupt the Service, including through
        excessive automated requests. We may investigate, restrict, or
        report activity we reasonably believe violates this section,
        including to law enforcement.
      </LegalSection>

      <LegalSection>
        <LegalLead>10. Transaction Monitoring.</LegalLead> Although PRYDD does
        not currently verify your identity as described in Section 4, we use
        blockchain analytics tools to screen the on-chain transactions
        associated with your account for exposure to sanctioned parties,
        suspected money laundering, or other financial crime risk
        indicators. If a transaction or account is flagged by this
        screening, we may delay, decline, restrict, or freeze the
        transaction or your account, and we may share the relevant account
        and transaction information with our screening providers, law
        enforcement, or regulators as required by law.
      </LegalSection>

      <LegalSection>
        <LegalLead>11. Suspension and Termination.</LegalLead> We may
        suspend, limit, or terminate your access to the Service at any time,
        with or without notice, if we reasonably believe you have violated
        this Agreement, if required by law, or to protect the Service or
        other users from fraud or harm. You may stop using the Service and
        request closure of your account at any time using the contact
        details in Section 16. Where legally permitted, we will make
        reasonable efforts to help you withdraw any remaining Balance before
        or after closing your account, subject to any legal holds or
        ongoing investigations.
      </LegalSection>

      <LegalSection>
        <LegalLead>12. Third-Party Services.</LegalLead> The Service relies
        on and may link to third parties we do not operate, including the
        Solana network, banking or payment partners used to fund your
        Balance, our transaction screening providers, and destinations like
        our litepaper or social media. We do not control and are not
        responsible for the content, security, or practices of any third
        party, and using the Service does not imply our endorsement of any
        linked destination.
      </LegalSection>

      <LegalSection>
        <LegalLead>13. Intellectual Property.</LegalLead> All content that is
        part of the Service, including text, graphics, logos, marks, icons,
        and the underlying code and design, is owned by Entrypoint Labs or
        its licensors and is protected by copyright, trademark, and other
        intellectual property laws. <LegalLead>&quot;PRYDD&quot;</LegalLead> and associated
        logos and marks are the property of Entrypoint Labs, Inc. Except as
        necessary to use the Service as intended, you may not copy,
        reproduce, modify, distribute, or create derivative works from any
        part of the Service without our prior written permission.
      </LegalSection>

      <LegalSection>
        <LegalLead>14. DISCLAIMER OF WARRANTIES.</LegalLead> THE SERVICE IS
        PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND,
        WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION
        WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
        TITLE, AND NON-INFRINGEMENT. ENTRYPOINT LABS DOES NOT WARRANT THAT
        THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT
        ANY TRANSFER WILL SETTLE WITHIN A PARTICULAR TIME.
      </LegalSection>

      <LegalSection>
        <LegalLead>15. LIMITATION OF LIABILITY.</LegalLead> TO THE FULLEST
        EXTENT PERMITTED BY LAW, ENTRYPOINT LABS AND ITS OFFICERS,
        EMPLOYEES, AND CONTRACTORS WILL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS
        OF PROFITS, DATA, OR GOODWILL, ARISING FROM OR RELATED TO YOUR
        ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE SERVICE,
        INCLUDING LOSSES RELATED TO A TRANSFER SENT TO THE WRONG RECIPIENT
        OR A DISRUPTION OF THE UNDERLYING BLOCKCHAIN NETWORK, EVEN IF WE
        HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. TO THE EXTENT
        WE ARE FOUND LIABLE NOTWITHSTANDING THE FOREGOING, OUR TOTAL
        LIABILITY TO YOU WILL NOT EXCEED THE GREATER OF ONE HUNDRED U.S.
        DOLLARS ($100) OR THE AMOUNT OF YOUR BALANCE AT THE TIME THE CLAIM
        AROSE.
      </LegalSection>

      <LegalSection>
        <LegalLead>16. Contact.</LegalLead> Questions about this Agreement,
        or requests related to your account, can be sent to us by email at{" "}
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
        <LegalLead>17. Changes to the Terms.</LegalLead> We may revise this
        Agreement at any time by posting an updated version with a new
        &quot;Last Updated&quot; date. For material changes, we will make
        reasonable efforts to notify you in the app or by email before they
        take effect. Continued use of the Service after a revision is posted
        constitutes your acceptance of it.
      </LegalSection>

      <LegalSection>
        <LegalLead>18. Governing Law.</LegalLead> This Agreement is governed
        by the laws applicable in Entrypoint Labs, Inc.&apos;s place of
        establishment, without regard to conflict-of-laws principles. Any
        dispute arising from this Agreement or your use of the Service will
        be resolved under those laws.
      </LegalSection>
    </LegalPage>
  )
}
