import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ContactBreadcrumb from "@/components/breadcrumb/contact-breadcrumb";
import ContactArea from "@/components/contact/contact-area";
import ContactMap from "@/components/contact/contact-map";
import Footer from "@/layout/footers/footer";

export const metadata = {
  title: "Andes Visión - Contacto",
};

export default function ContactPage() {
  return (
    <Wrapper>
      <HeaderTwo style_2={true} />
      <ContactBreadcrumb />
      <ContactArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
}
