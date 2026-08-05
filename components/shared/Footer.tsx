import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const footerLinks = {
  Platform: [
    {
      label: "Browse Gear",
      href: "/gears",
    },
    {
      label: "Categories",
      href: "/categories",
    },
    {
      label: "How It Works",
      href: "#how-it-works",
    },
    {
      label: "Become a Provider",
      href: "/provider",
    },
  ],

  Support: [
    {
      label: "Help Center",
      href: "/help",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
    {
      label: "Privacy Policy",
      href: "/privacy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
    },
  ],

  Categories: [
    {
      label: "Fitness",
      href: "/categories/fitness",
    },
    {
      label: "Cycling",
      href: "/categories/cycling",
    },
    {
      label: "Camping",
      href: "/categories/camping",
    },
    {
      label: "Sports",
      href: "/categories/sports",
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-8
          "
        >
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Gear<span className="text-primary">Up</span>
            </h2>

            <p
              className="
                mt-4
                text-sm
                text-muted-foreground
                leading-relaxed
              "
            >
              Rent quality sports and outdoor equipment from trusted providers.
              Adventure starts with the right gear.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={18} />
                <span>Jashore, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone size={18} />
                <span>+880 1234 567890</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Mail size={18} />
                <span>support@gearup.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                          text-sm
                          text-muted-foreground
                          hover:text-primary
                          transition
                        "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="
            mt-10
            pt-6
            border-t
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
          "
        >
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            © {new Date().getFullYear()} GearUp. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link href="#">
              <FaFacebook size={20} className="hover:text-primary transition" />
            </Link>

            <Link href="#">
              <FaInstagram
                size={20}
                className="hover:text-primary transition"
              />
            </Link>

            <Link href="#">
              <FaTwitter size={20} className="hover:text-primary transition" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
