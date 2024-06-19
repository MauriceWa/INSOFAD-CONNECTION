package com.example.todoappdeel3.utils;


import com.example.todoappdeel3.dao.*;
import com.example.todoappdeel3.models.*;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class Seeder {
    private final ProductDAO productDAO;
    private final UserRepository userRepository;
    private final CategoryDAO categoryDAO;
    private final OrderRepository orderRepository;

    private final OptionsRepository optionsRepository;

    private final ProductVariantRepository productVariantRepository;

    public Seeder(ProductDAO productDAO, UserRepository userRepository, CategoryDAO categoryDAO, OrderRepository orderRepository,  ProductVariantRepository productVariantRepository, OptionsRepository optionsRepository) {
        this.productDAO = productDAO;
        this.userRepository = userRepository;
        this.categoryDAO = categoryDAO;
        this.orderRepository = orderRepository;
        this.productVariantRepository = productVariantRepository;
        this.optionsRepository = optionsRepository;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event){
        this.seedProducts();
        this.seedAdmin();
    }

    private void seedProducts(){
        // Luxe categorieën aanhouden
        Category categoryHoodies = new Category("Luxury Hoodies");
        Category categoryPants = new Category("Designer Pants");
        Category categoryAccessories = new Category("Exclusive Accessories");
        Category categoryCapsAndBeanies = new Category("Designer Headwear");
        Category categoryOuterwear = new Category("Premium Outerwear");

// Luxe producten definiëren
        Product product1 = new Product("Cashmere Hoodie", "Crafted from 100% pure cashmere, this hoodie offers unparalleled softness and warmth, ideal for those who seek both comfort and luxury.", 400.00, categoryHoodies, "A+", "Tailored Fit", "https://cdn2.propercloth.com/pic_sp/1835_4507bda8842e6cdf2484d62e3eb77635_size5.jpg", 5);
        Product product2 = new Product("Silk Hoodie", "Experience the smooth touch of pure silk with this hoodie, combining casual design with luxury fabric for a sophisticated, relaxed look.", 350.00, categoryHoodies, "A++", "Tailored Fit", "https://coldcultureworldwide.com/cdn/shop/files/Product09_Aentamanogrande.png?v=1708614327&width=1080", 7);
        Product product11 = new Product("White Wool Hoodie", "Made from fine wool, this white hoodie blends comfort with elegance, perfect for a subtle, stylish statement.", 320.00, categoryHoodies, "A++",  "Tailored Fit", "imageURL" , 8);

        Product product3 = new Product("Italian Leather Pants", "Tailored from premium Italian leather, these pants offer a perfect blend of luxury and durability, tailored for the fashion-forward.", 700.00, categoryPants, "A+", "Slim Fit", "imageURL", 1);
        Product product4 = new Product("Suede Cargo Pants", "Elevate your style with these soft suede cargo pants, offering both comfort and a bold fashion statement.", 650.00, categoryPants, "A+", "Relaxed Fit", "imageURL", 3);
        Product product12 = new Product("Velvet Parachute Pants", "These parachute pants crafted from premium velvet redefine luxury in streetwear with their unique texture and comfort.", 600.00, categoryPants, "A++", "Over-sized", "imageURL", 7);

        Product product5 = new Product("Leather Satchel Bag", "Handcrafted from the finest leather, this satchel is a masterpiece of luxury accessories, perfect for the discerning individual.", 950.00, categoryAccessories, "A+",   "30cm x 35cm", "imageURL", 1);
        Product product6 = new Product("Exotic Skin Clutch Bag", "This clutch made from exotic animal skin stands out as a symbol of luxury and exclusivity, perfect for high-class events.", 1100.00, categoryAccessories, "A+",   "25cm x 15cm", "imageURL"  , 1);
        Product product13 = new Product("Gold-Plated Keychain", "A stunning gold-plated keychain that combines utility with opulence, making it an essential luxury for everyday elegance.", 200.00, categoryAccessories, "A+",   "8cm", "imageURL"  , 7);

        Product product7 = new Product("Merino Wool Beanie", "Crafted from 100% merino wool, this beanie provides exceptional warmth and style, making it a must-have accessory for any luxury wardrobe.", 120.00, categoryCapsAndBeanies, "A++", "Fitted", "imageURL", 2);
        Product product8 = new Product("Cashmere Flat Cap", "Made from soft cashmere, this flat cap offers a timeless look with luxurious comfort, perfect for stylish outdoor adventures.", 150.00, categoryCapsAndBeanies, "A++", "Fitted", "imageURL", 5);
        Product product14 = new Product("Silk Bucket Hat", "This silk bucket hat combines casual style with a touch of luxury, ideal for those who appreciate fine fabrics and contemporary design.", 180.00, categoryCapsAndBeanies, "A++",  "Fitted", "imageURL", 8);


        this.productDAO.createProduct(product1);
        this.productDAO.createProduct(product2);
        this.productDAO.createProduct(product3);
        this.productDAO.createProduct(product4);
        this.productDAO.createProduct(product5);
        this.productDAO.createProduct(product6);
        this.productDAO.createProduct(product7);
        this.productDAO.createProduct(product8);
        this.productDAO.createProduct(product11);
        this.productDAO.createProduct(product12);
        this.productDAO.createProduct(product13);
        this.productDAO.createProduct(product14);

        this.categoryDAO.createCategory(categoryHoodies);
        this.categoryDAO.createCategory(categoryPants);
        this.categoryDAO.createCategory(categoryAccessories);
        this.categoryDAO.createCategory(categoryCapsAndBeanies);
        this.categoryDAO.createCategory(categoryOuterwear);

        ProductVariant productVariant = new ProductVariant(
                "Grootte",
                "De grootte van een hoodie",
                product1
        );

        ProductVariant productVariant2 = new ProductVariant(
                "Kleur",
                "De kleur van de hoodie",
                product1
        );

        ProductVariant productVariant3 = new ProductVariant(
                "Print",
                "De print van de hoodie",
                product1
        );



        this.productVariantRepository.save(productVariant);

        this.productVariantRepository.save(productVariant2);

        this.productVariantRepository.save(productVariant3);

        Options optionS = new Options("S", 100, productVariant);
        Options optionM = new Options("M", 150, productVariant);
        Options optionL = new Options("L", 200, productVariant);
        Options optionXL = new Options("XL", 300, productVariant);

        Options optionRed = new Options("Red", 100, productVariant2);
        Options optionBlue = new Options("Blue", 150, productVariant2);
        Options optionBlack = new Options("Black", 200, productVariant2);

        Options optionPrintOne = new Options("Grote Print",200 , productVariant3);
        Options optionPrintTwo = new Options("Medium Print", 100, productVariant3);
        Options optionPrintThree = new Options("Small Print", 50, productVariant3);


        this.optionsRepository.save(optionS);
        this.optionsRepository.save(optionM);
        this.optionsRepository.save(optionL);
        this.optionsRepository.save(optionXL);


        this.optionsRepository.save(optionRed);
        this.optionsRepository.save(optionBlue);
        this.optionsRepository.save(optionBlack);

        this.optionsRepository.save(optionPrintOne);
        this.optionsRepository.save(optionPrintTwo);
        this.optionsRepository.save(optionPrintThree);


        ProductVariant productVariantSilkHoodieSize = new ProductVariant(
                "Grootte",
                "De grootte van een hoodie",
                product2
        );

        ProductVariant productVariantSilkHoodieColor = new ProductVariant(
                "Kleur",
                "De kleur van de hoodie",
                product2
        );

        ProductVariant productVariantSilkHoodiePrint = new ProductVariant(
                "Print",
                "De print van de hoodie",
                product2
        );

        this.productVariantRepository.save(productVariantSilkHoodieSize);

        this.productVariantRepository.save(productVariantSilkHoodieColor);

        this.productVariantRepository.save(productVariantSilkHoodiePrint);


        Options optionSilkHoodieS = new Options("S", 100, productVariantSilkHoodieSize);
        Options optionSilkHoodieM = new Options("M", 150, productVariantSilkHoodieSize);
        Options optionSilkHoodieL = new Options("L", 200, productVariantSilkHoodieSize);
        Options optionSilkHoodieXL = new Options("XL", 300, productVariantSilkHoodieSize);

        Options optionSilkHoodieRed = new Options("Red", 100, productVariantSilkHoodieColor);
        Options optionSilkHoodieBlue = new Options("Blue", 150, productVariantSilkHoodieColor);
        Options optionSilkHoodieBlack = new Options("Black", 200, productVariantSilkHoodieColor);

        Options optionSilkHoodiePrintOne = new Options("Grote Print",200 , productVariantSilkHoodiePrint);
        Options optionSilkHoodiePrintTwo = new Options("Medium Print", 100, productVariantSilkHoodiePrint);
        Options optionSilkHoodiePrintThree = new Options("Small Print", 50, productVariantSilkHoodiePrint);



        this.optionsRepository.save(optionSilkHoodieS);
        this.optionsRepository.save(optionSilkHoodieM);
        this.optionsRepository.save(optionSilkHoodieL);
        this.optionsRepository.save(optionSilkHoodieXL);


        this.optionsRepository.save(optionSilkHoodieRed);
        this.optionsRepository.save(optionSilkHoodieBlue);
        this.optionsRepository.save(optionSilkHoodieBlack);

        this.optionsRepository.save(optionSilkHoodiePrintOne);
        this.optionsRepository.save(optionSilkHoodiePrintTwo);
        this.optionsRepository.save(optionSilkHoodiePrintThree);

    }

    private void seedAdmin(){
        String encodedPassword = new BCryptPasswordEncoder().encode("ADMIN_PASSWORD");
        CustomUser customUser = new CustomUser("ADMIN", encodedPassword, "ROLE_ADMIN"); //ROLE_ IS A MUST FOR SPRING SECURITY
        userRepository.save(customUser);
    }
}
