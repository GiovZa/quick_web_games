import CookieConsent from 'react-cookie-consent';

export default function CookieConsentpage() {
    return (
        <CookieConsent
            location="bottom"
            buttonText="I Understand."
            style={{ background: "#FFF8DC", color: "#DAA520" }}
            buttonStyle={{ background: "#007bff", color : "#fff", border: "#007bff", fontSize: "13px" }}
        >
            This website uses cookies to enhance the user experience.
        </CookieConsent>
    )
}
