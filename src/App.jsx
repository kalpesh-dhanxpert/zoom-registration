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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First Name is required";
    if (!formData.lastName.trim()) errs.lastName = "Last Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errs.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errs.phone = "Phone number must be 10 digits";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/zoom/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const { status } = await res.json();

      if (status === true) {
        toast.success("Successfully registered!");
        setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      } else {
        toast.error(`Something went wrong`);
      }
    } catch (error) {
      console.error(error);

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
            <input
              type="text"
              name="firstName"
              autoComplete="off"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
            <input
              type="text"
              name="lastName"
              autoComplete="off"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}

            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input
              type="number"
              name="phone"
              autoComplete="off"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <button type="submit" className="submit-button">
              {loading ? "Submitting..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      <div className="speaker-card">
        <h2 className="speaker-title">Speakers</h2>

        <div className="speaker-info">
          <img src={speakerImg} alt="Amit Soni" className="speaker-img" />

          <div className="speaker-details">
            <h3 className="name">Amit Soni</h3>
            <p className="designation">
              Co-Founder & CEO – <span className="org">DhanXpert</span> ·{" "}
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
              Amit Soni is the Co-Founder & CEO of DhanXpert, India’s
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
