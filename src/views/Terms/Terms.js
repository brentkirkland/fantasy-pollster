/* @flow */
import React from 'react'
import s from './Terms.scss'
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import ReactDOM from 'react-dom'
// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class Terms extends React.Component {

  static propTypes = {
    route: React.PropTypes.object.isRequired
  };

  componentDidMount () {
    ReactDOM.findDOMNode(this).scrollIntoView()
  }

  render () {
    return (
      <div className={s.root}>
        <Header fixed={false} home route={this.props.route}/>
        <div className={s.fakeunder}></div>
        <div className={s.container}>
          <span className={s.title}>Terms of Use</span>
          <span className={s.effective}>Effective as of February 20, 2016</span>
          <span className={s.welcome}>Welcome to FantasyPollster.com (the "<b>Site</b>"). Livv, Inc., a Delaware corporation ("<b>Company"</b>, "<b>us</b>", "<b>our</b>", or "<b>we</b>") owns and operates the Site and provides it to you subject to these Terms of Use (the “Agreement”) which constitutes a legally binding contract between you and the Company.  By registering for an Account (as defined below) or using the Site in any manner whatsoever, you agree to be bound by this Agreement in full and without modification.</span>
          <span className={s.welcome}>This Agreement may be modified or replaced at any time in the Company's sole discretion. After any modification or replacement, users with registered Accounts will be emailed a notification of the change. Your continued use of the Site after such a change will constitute your consent to be bound by the new Terms of Use.</span>
          <span className={s.number}>1. &emsp; Accounts.</span>
          <span className={s.letter}><b>(a) &emsp; Account Registration.</b>You must register a user account with the Site ("<b>Account</b>") in order to participate in the Site. You represent and warrant that: (a) all required registration information you submit is truthful, complete, and accurate in all respects; (b) you will maintain the accuracy of such information; and (c) you will not, under any circumstance, share your Account with any other person or participate in the Site or any Contest through any other person’s Account.</span>
          <span className={s.letter}><b>(b) &emsp; Account Eligibility</b>. You represent and warrant that, if you register for an Account:</span>
          <span className={s.subletter}><b>(i)</b> you are at least 18 years of age, or 19 years of age in Alabama or Nebraska, or older where required by law;</span>
          <span className={s.subletter}><b>(ii)</b> you reside in the United States;</span>
          <span className={s.subletter}><b>(iii)</b> if you live in Arizona, Hawaii, Iowa, Louisiana, Mississippi, Montana, Nevada, and Washington, you may register for an Account but will be ineligible for Prizes offered by the Site; and</span>
          <span className={s.subletter}><b>(iv)</b> You are not (a) any person, (b) the immediate family of any person, or (c) in possession of any material non-public information about any person included as an option for prediction in any Contest in which you participate.</span>
          <span className={s.letter}><b>(c) &emsp; Account Termination.</b>You may terminate your Account at any time, for any reason, by following the instructions on the Site. The Company may suspend or terminate your Account at any time and for any reason, with or without notice. Upon termination, any remaining balance of Fantasy Pollster Points in your Account will be distributed to your PayPal account on file.</span>
          <span className={s.letter}><b>(d) &emsp; Account Security.</b>You are responsible for maintaining the confidentiality of your Account login information at all times. You agree to immediately notify the Company of any unauthorized use of your account. You assume sole liability for any purchases or activities connected to your Account.</span>
          <span className={s.number}><b>2. &emsp; Contests, Payments, and Prizes.</b></span>
          <span className={s.letter}><b>(a) &emsp; Contests. </b>After creating an account, you will have the option of entering into Fantasy Pollster contests (each a "<b>Contest</b>"). All Contests are contests of skill and not contests of chance. Contests will be judged according to the objective criteria described on the Site. Some Contests may require a fee to enter. Each Contest fee will be represented by a denomination of Fantasy Pollster Points (as defined below) and may also be represented by the US dollar monetary equivalent. When you agree to enter into a paid Contest, the number of Fantasy Pollster Points indicated as the fee will be deducted from your Account.</span>
          <span className={s.letter}><b>(b) &emsp; Payments. </b>If you wish to participate in Contests that require payment you agree to (i) provide accurate, truthful, and complete payment information, such as a credit card or debit card, to the Site (the "<b>Payment Information</b>"); (ii) authorize the Company to charge, or use a third-party payment processor to charge, your Payment Information for the amount indicated on the Site (the "<b>Charge</b>"); and (iii) not dispute, chargeback, or cancel your payment. Each Charge will purchase a specified number of in-Site credits which may be redeemed for entry into Contests (the "<b>Fantasy Pollster Points</b>"). No refunds, rebates, or returns will be made under any circumstance whatsoever, except pursuant to Section 2(f) of this Agreement.</span>
          <span className={s.letter}><b>(c) &emsp; Withdrawals. </b>The winning Account of each Contest will be posted on the Site and the proceeds for winning the Contest, as described more fully in each Contest, will be deposited into the winner’s Account in the form of Fantasy Pollster Points, net of the administration fee, as posted on the Site and subject to change from time to time (the "<b>Prize</b>"). You may withdraw Fantasy Pollster Points by transferring the represented funds to your PayPal account (or other accepted third party payment account, as the Site may select) at the then-current conversion rate which shall be posted on the Site.</span>
          <span className={s.subletter}><b>(i) &emsp;</b> Before allowing any withdrawal, the Company may require that you complete and execute an affidavit of eligibility and compliance with this Agreement. If the Company requests that you complete and execute such an affidavit and you fail to do so within seven (7) days, or the Company otherwise determines that you fail to meet any of the terms of this Agreement, the Company reserves the right to terminate your account and withhold or revoke the awarding of any Prizes. In such a situation, the Company may, in its sole discretion, opt to pay out any withheld or revoked Prizes to the other entrants in the relevant Contest in a manner consistent with the Rules of the Contest.</span>
          <span className={s.subletter}><b>(ii) &emsp;</b>The Company will make an effort to process all Withdrawals within ten (10) business days, but cannot be held responsible for delays in processing due to force majeure or third party processor delays.</span>
          <span className={s.subletter}><b>(iii) &emsp;</b>You are solely responsible for paying and reporting taxes on all Prizes.</span>
          <span className={s.subletter}><b>(iv) &emsp;</b>No substitution or transfer of any Prize is permitted.</span>
          <span className={s.letter}><b>(d)  &emsp; Contest Scoring.</b> The Site will judge Contests based on reported information. While the Site will use its best efforts to utilize accurate and current information, the Company cannot be held responsible for inaccurate information. All Contests will be judged based on the information that the Company, in its good faith judgment, deems to be truthful and complete. Results and winners will not be changed after a Contest is deemed closed.</span>
          <span className={s.letter}><b>(e) &emsp; Posting of Prizes.</b> Prizes will be awarded and credited to any Contest winner’s account by 5:00 PM EST on the Publication Date (as listed on the Site for each Contest) of each Contest, except in circumstances where technical failure or the inability of the Company to verify a winner’s compliance with this Agreement prevents it. Contest prize payouts will be published with the creation of each new Contest. For the avoidance of doubt,</span>
          <span className={s.letter}><b>(f) &emsp; Cancellation of Contests.</b> The Company reserves the right, in its sole and absolute discretion, to cancel or discontinue any of the Contests for any reason whatsoever. In the event of a cancellation under this Section 2(f), all entrants in the cancelled Contest shall receive a full credit in their Accounts of any Fantasy Pollster Points used to enter the Contest.</span>
          <span className={s.number}><b>3. &emsp; Access to the Site.</b></span>
          <span className={s.letter}><b>(a) &emsp; Access.</b> The Company reserves the right, at any time and in its sole and absolute discretion, to (i) modify, suspend, or discontinue the Site (in whole or in part) with or without notice, or (ii) suspend, limit, or terminate your Account with or without notice.</span>
          <span className={s.number}><b>4. &emsp; User Content.</b></span>
          <span className={s.letter}><b>(a) &emsp; User Content. </b>You are solely responsible for all information you submit to the site after creating an Account, including photos, videos, text, sound, or other content (collectively, “<b>User Content</b>”). You assume all risks associated with use of your User Content, including any reliance on its accuracy, completeness or usefulness by others, or any disclosure of your User Content that personally identifies you or any third party. You will not post any User Content that is, in any way:</span>
          <span className={s.subletter}><b>(i) &emsp;</b>illegal or prohibited in any jurisdiction where it may be accessed;</span>
          <span className={s.subletter}><b>(ii) &emsp;</b>offensive, harassing, pornographic, or defamatory;</span>
          <span className={s.subletter}><b>(iii) &emsp;</b>malicious or interferes with, or attempts to disrupt or circumvent, the Site's usage or security; or</span>
          <span className={s.subletter}><b>(iv) &emsp;</b>not owned by you, or has not been authorized for your use.</span>
          <span className={s.letter}><b>(b) &emsp; License. </b>You hereby grant (and you represent and warrant that you have the right to grant) to Company an irrevocable, nonexclusive, royalty-free and fully paid, worldwide license to reproduce, distribute, publicly display and perform, prepare derivative works of, incorporate into other works, and otherwise use and exploit your User Content, and to grant sublicenses of the foregoing rights, solely for the purposes of including your User Content in the Site in the method designated by your Account settings. The Company may delete or modify User Content at any time and for any reason.</span>
          <span className={s.number}><b>5. &emsp; Disclaimers.</b></span>
          <span className={s.letter}>THE SITE IS PROVIDED ON AN “AS-IS” AND “AS AVAILABLE” BASIS, AND THE COMPANY EXPRESSLY DISCLAIMs ANY AND ALL REPRESENTATIONS, WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ALL WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, OR NON-INFRINGEMENT. THE COMPANY AND ITS SHAREHOLDERS, EMPLOYEES, DIRECTORS, AND OFFICERS (“AFFILIATES”) MAKE NO WARRANTIES THAT THE SITE WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS, OR WILL BE ACCURATE, RELIABLE, COMPLETE, OR SAFE. IF APPLICABLE LAW REQUIRES ANY WARRANTIES WITH RESPECT TO THE SITE, ALL SUCH WARRANTIES ARE LIMITED IN DURATION TO NINETY (90) DAYS FROM THE DATE OF FIRST USE. </span>
          <span className={s.letter}>YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT BY PARTICIPATING IN ANY CONTEST ON THE SITE, YOU WILL ENCOUNTER THE SIGNIFICANT RISK OF LOSING MONEY.</span>
          <span className={s.number}><b>5. &emsp; Limitation on Liability.</b></span>
          <span className={s.letter}>TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE COMPANY OR COMPANY AFFILIATES BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS, LOST DATA, COSTS OF PROCUREMENT OF SUBSTITUTE PRODUCTS, OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO THIS AGREEMENT OR YOUR USE OF, OR INABILITY TO USE, THE SITE, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE OF, THE SITE IS AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR DEVICE OR COMPUTER SYSTEM, OR LOSS OF DATA RESULTING THEREFROM.</span>
          <span className={s.letter}>TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM OR RELATED TO THIS AGREEMENT (FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION), WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF FIVE HUNDRED US DOLLARS. THE EXISTENCE OF MORE THAN ONE CLAIM WILL NOT ENLARGE THIS LIMIT. YOU AGREE THAT OUR SUPPLIERS WILL HAVE NO LIABILITY OF ANY KIND ARISING FROM OR RELATING TO THIS AGREEMENT.</span>
          <span className={s.number}><b>7. &emsp; General</b></span>
          <span className={s.letter}><b>(a) &emsp;</b> You agree to indemnify, defend and hold harmless the Company and its Affiliates from and against any claim, liability, or demand made by any third party, including for attorneys' fees and expenses, due to or arising out of (a) your use of the Site, (b) your violation of this Agreement, (c) your violation of applicable laws or regulations, or (d) your User Content.</span>
          <span className={s.letter}><b>(b) &emsp; Intellectual Property.</b> You agree that the intellectual property found through the site, including copyrights, trademarks, patents, trade secrets, trade dress, and any other content other than User Content (collectively, “Intellectual Property”), belongs solely to the Company or its respective owner. You acknowledge that you have been granted no right, license, or assignment with respect to any Intellectual Property and that you will not use, share, distribute, sell, or modify any Intellectual Property, including derivates thereof.</span>
          <span className={s.letter}><b>(c) &emsp; Choice of Law; Disputes.</b> This Agreement shall be governed exclusively by the laws of the state of California without regard for any conflict of law. Any dispute arising under this Agreement, relating to the subject matter hereof, or relating to your use of the Site or participation in any Contest, shall be adjudicated solely by arbitration in Santa Barbara County, California. In the case of arbitration, the parties will, in good faith, select one mutually agreed upon arbitrator located in Santa Barbara County, California and listed with the American Arbitration Association. If the parties cannot agree on an arbitrator, the parties will ask the American Arbitration Association to select at random an arbitrator located in Santa Barbara County, California. YOU ACKNOWLEDGE AND AGREE TO WAIVE YOUR RIGHT TO PARTICIPATE IN ANY CLASS ACTION LITIGATION, GROUP LITIGATION, OR GROUP ARBITRATION.</span>
          <span className={s.letter}><b>(d) &emsp; Entire Agreement.</b> This Agreement constitutes the full, final, and complete agreement between the parties.</span>
          <span className={s.letter}><b>(e) &emsp; Contact Us: </b>You may contact the Company at support@fantasypollster.com</span>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Terms
