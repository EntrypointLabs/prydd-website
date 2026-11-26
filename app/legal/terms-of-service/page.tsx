import type { Metadata } from "next"

import { LegalLead, LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for the Prydd app and website.",
  alternates: {
    canonical: "/legal/terms-of-service",
  },
}

export default function Page() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="26th November 2026">
      <LegalSection>
        This Terms of Service agreement (the <LegalLead>&quot;Agreement&quot;</LegalLead>) governs
        your access to and use of Prydd, a dollar account product made up of
        the website located at prydd.co, the Prydd mobile application, and
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
        <LegalLead>2. The Service.</LegalLead> Prydd lets you hold a balance
        denominated in U.S. dollars (your <LegalLead>&quot;Balance&quot;</LegalLead>); add money to
        it in your local currency through our payment partners; send dollars
        to other Prydd accounts, saved contacts, Solana addresses, and
        supported local bank accounts; swap between dollars and other digital
        assets, including tokenized stocks and ETFs; place dollars in Earn
        with third-party lending providers; and pay participating online
        merchants with Pay with Prydd. Transfers settle on the Solana
        blockchain. Nothing in this Agreement or elsewhere on the Service
        constitutes financial, investment, legal, or tax advice, and any
        figures, timelines, or forward-looking statements are illustrative
        only and may change without notice.
      </LegalSection>

      <LegalSection>
        <LegalLead>3. Your Account.</LegalLead> You sign in to Prydd with your
        email address and a passkey rather than a password. Your account is
        a smart account that needs two of three keys to move money: your
        passkey, which syncs through your Apple or Google account; a key
        secured on your phone; and a recovery key that Entrypoint Labs holds
        in encrypted form and uses only to help you recover access after you
        prove control of your email address. The recovery key cannot move
        money on its own. Changes to your account&apos;s keys or spending limit
        take effect after a 24-hour delay, during which you can reject them.
        You are responsible for keeping your devices, passkey, and email
        account secure and for all activity that occurs through your
        account. Notify us immediately at the contact details in Section 18
        if you believe your account has been accessed without your
        permission. We are not liable for losses caused by your failure to
        keep your devices, passkey, or email account secure.
      </LegalSection>

      <LegalSection>
        <LegalLead>4. Identity Verification.</LegalLead> Prydd does not
        require identity verification to create an account or hold a
        Balance. Adding or sending local currency above a daily limit
        requires an identity check, such as a bank verification number,
        carried out by our payment partner. We reserve the right to require
        you to verify your identity (for example, by providing your legal
        name, date of birth, address, or a government-issued ID) at any
        time, including as required by applicable law or if we suspect
        fraud, and to limit, suspend, or close your account if you do not
        complete verification we request.
      </LegalSection>

      <LegalSection>
        <LegalLead>5. Funding and Transfers.</LegalLead> You can add funds to
        your Balance by bank transfer in your local currency through a
        payment partner, which converts it to dollars at the rate shown
        before you confirm. You can send funds to other Prydd accounts, to
        Solana addresses, and, through a payment partner, to supported
        local bank accounts. Transfers are generally intended to settle
        quickly, but we do not guarantee a specific settlement time, and we
        may delay, limit, or decline a transaction to comply with law,
        prevent fraud, or protect the Service. Because transfers settle on
        the Solana blockchain, completed transactions are generally
        irreversible; we cannot reverse, cancel, or recover a transfer once
        it has settled. You are responsible for making sure you are sending
        funds to the correct recipient.
      </LegalSection>

      <LegalSection>
        <LegalLead>6. Fees.</LegalLead> Entrypoint Labs does not currently
        charge a fee to hold a Balance or send money to another Prydd
        account, and we cover the Solana network fees for sends, swaps, and
        Earn deposits and withdrawals. Adding local currency and sending to a
        bank account carry the payment partner&apos;s fee and exchange rate,
        and a swap is priced by third-party liquidity providers; in each
        case the amount you pay and receive is shown before you confirm. We
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
        <LegalLead>9. Earn, Swap, and Investments.</LegalLead> Earn places
        dollars you choose with third-party lending providers. Rates are set
        by those providers, change over time, and are not guaranteed, and
        Earn balances are not bank deposits and are not insured. Swap
        exchanges assets at quotes from third-party liquidity providers.
        Digital assets you hold other than your dollar Balance, including
        wrapped bitcoin and tokenized stocks and ETFs, are issued by third
        parties and can lose value. Tokenized stocks and ETFs track the
        price of a share or fund; they are not shares, carry no voting or
        shareholder rights, and may not be available in your country. You
        could lose some or all of the value you place in these products.
      </LegalSection>

      <LegalSection>
        <LegalLead>10. Paying Merchants.</LegalLead> Pay with Prydd lets you
        pay participating online merchants from your Balance by confirming
        with your passkey. After your first payment to a merchant, later
        payments to that merchant may need only a single confirmation; you
        can remove a merchant&apos;s access at any time in the app. Payments
        above your spending limit require approval on your phone. The
        merchant, not Entrypoint Labs, is responsible for the goods or
        services you buy, and refunds are issued at the merchant&apos;s
        discretion under its own policies.
      </LegalSection>

      <LegalSection>
        <LegalLead>11. Prohibited Uses.</LegalLead> You agree not to use the
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
        <LegalLead>12. Transaction Monitoring.</LegalLead> Whether or not we
        have verified your identity as described in Section 4, we use
        blockchain analytics tools to screen the blockchain transactions
        associated with your account for exposure to sanctioned parties,
        suspected money laundering, or other financial crime risk
        indicators. If a transaction or account is flagged by this
        screening, we may delay, decline, restrict, or freeze the
        transaction or your account, and we may share the relevant account
        and transaction information with our screening providers, law
        enforcement, or regulators as required by law.
      </LegalSection>

      <LegalSection>
        <LegalLead>13. Suspension and Termination.</LegalLead> We may
        suspend, limit, or terminate your access to the Service at any time,
        with or without notice, if we reasonably believe you have violated
        this Agreement, if required by law, or to protect the Service or
        other users from fraud or harm. You may stop using the Service and
        request closure of your account at any time using the contact
        details in Section 18. Where legally permitted, we will make
        reasonable efforts to help you withdraw any remaining Balance before
        or after closing your account, subject to any legal holds or
        ongoing investigations.
      </LegalSection>

      <LegalSection>
        <LegalLead>14. Third-Party Services.</LegalLead> The Service relies
        on and may link to third parties we do not operate, including the
        Solana network, banking and payment partners, the providers that
        secure your account&apos;s keys, lending and liquidity providers
        used for Earn and Swap, the issuers of stablecoins and tokenized
        assets, merchants you pay, our transaction screening providers, and
        destinations like social media. We do not control and are not
        responsible for the content, security, or practices of any third
        party, and using the Service does not imply our endorsement of any
        linked destination.
      </LegalSection>

      <LegalSection>
        <LegalLead>15. Intellectual Property.</LegalLead> All content that is
        part of the Service, including text, graphics, logos, marks, icons,
        and the underlying code and design, is owned by Entrypoint Labs or
        its licensors and is protected by copyright, trademark, and other
        intellectual property laws. <LegalLead>&quot;Prydd&quot;</LegalLead> and associated
        logos and marks are the property of Entrypoint Labs, Inc. Except as
        necessary to use the Service as intended, you may not copy,
        reproduce, modify, distribute, or create derivative works from any
        part of the Service without our prior written permission.
      </LegalSection>

      <LegalSection>
        <LegalLead>16. DISCLAIMER OF WARRANTIES.</LegalLead> THE SERVICE IS
        PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT WARRANTIES OF ANY KIND,
        WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT LIMITATION
        WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
        TITLE, AND NON-INFRINGEMENT. ENTRYPOINT LABS DOES NOT WARRANT THAT
        THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT
        ANY TRANSFER WILL SETTLE WITHIN A PARTICULAR TIME.
      </LegalSection>

      <LegalSection>
        <LegalLead>17. LIMITATION OF LIABILITY.</LegalLead> TO THE FULLEST
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
        <LegalLead>18. Contact.</LegalLead> Questions about this Agreement,
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
        <LegalLead>19. Changes to the Terms.</LegalLead> We may revise this
        Agreement at any time by posting an updated version with a new
        &quot;Last Updated&quot; date. For material changes, we will make
        reasonable efforts to notify you in the app or by email before they
        take effect. Continued use of the Service after a revision is posted
        constitutes your acceptance of it.
      </LegalSection>

      <LegalSection>
        <LegalLead>20. Governing Law.</LegalLead> This Agreement is governed
        by the laws applicable in Entrypoint Labs, Inc.&apos;s place of
        establishment, without regard to conflict-of-laws principles. Any
        dispute arising from this Agreement or your use of the Service will
        be resolved under those laws.
      </LegalSection>
    </LegalPage>
  )
}
