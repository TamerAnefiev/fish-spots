import setDocumentTitle from "../../util/setDocTitle";
import { websiteName } from "../../util/constants";

export default function PrivacyPolicy() {
  setDocumentTitle("Privacy Policy");

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 bg-cyan-800 mt-2 mb-2 rounded text-white">
      <h2 className="text-3xl font-bold mb-4">
        Privacy Policy for {websiteName}
      </h2>
      <p className="mb-4">Last updated: 11/April/2024</p>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Use of Cookies</h3>
        <p className="mb-4">
          {websiteName} uses cookies to enable Google Maps functionality. These
          cookies are essential for the proper functioning of the website and
          are not used to collect any personal information.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Third-Party Services</h3>
        <p className="mb-4">
          Google Maps is integrated into {websiteName}, and its use is subject
          to Google's Privacy Policy. Please refer to Google's privacy policy
          for information on how Google collects and processes data.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Data Retention</h3>
        <p className="mb-4">
          {websiteName} does not retain any personal information collected
          through cookies. The website does not track users or store any user
          data.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          Changes to This Privacy Policy
        </h3>
        <p className="mb-4">
          {websiteName} may update this Privacy Policy from time to time. Any
          changes will be posted on this page with a revised effective date. We
          encourage you to review this Privacy Policy periodically for any
          updates.
        </p>
      </div>
    </div>
  );
}
