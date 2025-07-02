import { useState } from "react";
import "./App.css";
import bannerImage from "../src/assets/Webinar.jpg";
import speakerImg from "../src/assets/speaker.jpg";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/register-webinar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { success } = await res.json();

      if (success === true) {
        // setMessage("✅ Successfully registered!");
        toast.success("Successfully registered!");
        setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      } else {
        // setMessage(`❌ Error: ${data?.message || "Something went wrong"}`);
        toast.error(`❌ Error: ${data?.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      // setMessage("❌ Network or server error");
      toast.error("❌ Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="registration-container">
        <div className="banner-section">
          <img
            src={bannerImage}
            alt="Webinar Banner"
            className="banner-image"
          />
        </div>

        <div className="content-section">
          <h2 className="webinar-title">GROW YOUR MFDs BUSINESS DIGITALLY</h2>
          <p className="datetime">
            📅 Date & Time &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Jul 4, 2025
            04:00 PM in India
          </p>

          <h3 className="form-title">Webinar Registration</h3>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                autoComplete="off"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                autoComplete="off"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-column">
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                autoComplete="off"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              {loading ? "Submitting..." : "Register"}
            </button>
          </form>

          {message && <p className="mt-4  text-base font-medium">{message}</p>}
        </div>
      </div>

      <div className="speaker-card">
        <h2 className="speaker-title">Speakers</h2>

        <div className="speaker-info">
          <img src={speakerImg} alt="Amit Soni" className="speaker-img" />

          <div className="speaker-details">
            <h3 className="name">Amit Soni</h3>
            <p className="designation">
              Founder & CEO – <span className="org">DhanXpert</span> ·{" "}
              <a
                href="https://dhanxpert.in"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                DhanXpert
              </a>
            </p>

            {/* <div className="social-icons">
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                  <img src={youtubeIcon} alt="YouTube" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <img src={linkedinIcon} alt="LinkedIn" />
                </a>
              </div> */}

            <p className="description">
              Amit Soni is the Founder & CEO of DhanXpert, India’s
              fastest-growing discovery platform for investors and Mutual Fund
              Distributors (MFDs). With over 10 years of experience in the
              financial and digital space, Amit has helped more than 1,000+ MFDs
              build their business digitally and move beyond traditional, local
              referral models.
              <br />
              <br />A passionate fintech leader, he founded DhanXpert to make
              financial consultation more accessible, digital-first, and
              growth-oriented. His mission is to empower MFDs to create a strong
              online presence, attract clients effectively, and scale their
              services across India. Amit is known for his strategic insights,
              actionable tips, and commitment to transforming how MFDs connect
              with modern investors.
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
