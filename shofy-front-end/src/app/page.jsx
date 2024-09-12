import Wrapper from "@/layout/wrapper";
import HeaderTwo from '@/layout/headers/header-2';
import FashionBanner from '@/components/banner/fashion-banner';
import BlogArea from "@/components/blog/electronic/blog-area";
import InstagramArea from "@/components/instagram/instagram-area";
import FashionTestimonial from '@/components/testimonial/fashion-testimonial';
import FashionCategory from '@/components/categories/fashion-category';
import JewelryBrands from '@/components/brand/jewelry-brands';
import Footer from "@/layout/footers/footer";
import FeatureAreaTwo from '@/components/features/feature-area-2';
import ProductArea from '@/components/products/fashion/product-area';
import PopularProducts from '@/components/products/jewelry/popular-products';

export default function HomePage() {
  return (
    <Wrapper>
      <HeaderTwo/>
      <FashionBanner/>
      <FashionCategory/>
      <ProductArea/>
      {/*<BlogArea/>*/}
      <FashionTestimonial/>
      <FeatureAreaTwo/>
      <InstagramArea/>
      <JewelryBrands/>
      <Footer/>
    </Wrapper>
  )
}
