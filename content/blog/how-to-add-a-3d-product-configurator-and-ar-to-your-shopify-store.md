---
title: "How to Add a 3D Product Configurator and AR to Your Shopify Store"
metaTitle: "How to Add a 3D Product Configurator and AR to Shopify"
metaDescription: "Install a Shopify app, match your 3D models to products, switch on the app embed. A step-by-step guide to 3D viewers, configurators and AR on Shopify."
excerpt: "You can add a 3D viewer, a live configurator and view-in-your-room AR to a Shopify store without editing theme code. Here is the whole setup, what you need before you start, and how it plays out for furniture, kitchens, doors, bathrooms, tiles and lighting."
tags: [shopify, 3d-configurator, ar, how-to, shopify-app]
image: "https://website-api.tyashin.com/api/v1/public/media/ecommerce/69f1354e7766b41fbc101ded/media/1793755953379-blog-how-to-add-a-3d-product-configurator-and-ar-to-your-shopify-store.png"
faqSchema: true
---

You add a 3D product configurator and AR to a Shopify store by installing an app that reads your catalogue, linking a 3D model to each product, and switching the viewer on through the theme editor. With the [Thridify app on the Shopify App Store](https://apps.shopify.com/thridify-3d-ar-configurator) that is a few minutes of clicking per store, and nobody touches theme code.

The clicking is the quick part. Most of the real work is in the 3D models, and in deciding which products deserve 3D in the first place. This guide covers both, using the Thridify app as the worked example because it's the one we build and can describe accurately.

If you want the deeper reasoning on when Shopify's own 3D media is enough and when you need a configurator layered on top, read [how to add 3D and AR to a Shopify product page](/blog/how-to-add-3d-and-ar-to-a-shopify-product-page) first. This post is the hands-on setup.

## What does a 3D configurator and AR app actually add to a Shopify store?

It adds four things a photo gallery can't do: a 3D viewer the shopper can rotate, zoom and measure; a configurator that changes the model when they pick a finish or variant; AR that places the product in their room at true scale; and a way to see whether any of that sold anything.

In the Thridify app those show up as:

- **A 3D viewer on the product page.** Shoppers spin the product, zoom into details and check dimensions with a measure tool.
- **AR on iPhone and Android.** On a phone, "View in your room" opens the native AR viewer. On a desktop, the shopper scans a QR code and the same product opens on their phone, ready to place.
- **A live 3D configurator.** Picking walnut, oak or brushed brass changes the model on screen. Choices stay in step with your Shopify variants, so what they configure is what goes in the cart.
- **3D badges on collection cards,** so shoppers can see which products are viewable in 3D before they click.
- **An orders report** that separates orders which followed a 3D or AR view from the rest.

## How do you set it up, step by step?

Install the app, connect your catalogue, turn on the app embed, then test on a real phone. In order:

1. **Install the app** from the [Shopify App Store listing](https://apps.shopify.com/thridify-3d-ar-configurator). There is a free plan, so you can try the whole flow on a live store before committing.
2. **Bring in your 3D models.** Upload GLB (and USDZ if you have it) files for the products you want in 3D, or have Thridify's [3D modelling service](/services/3d-modelling) build them from your spec sheets and photos.
3. **Match models to products.** The app matches each model to a Shopify product by SKU, handle, product ID or title. Check the matches, fix the odd one by hand, and run a resync whenever you add products or change variants.
4. **Set up options** for the products that come in more than one finish or material, so each variant points at the right look on the model.
5. **Switch it on in your theme.** Turn on the app embed, or drop the app's theme blocks into the product template and collection cards in the theme editor. Neither route touches your theme code.
6. **Test on two real phones,** one iPhone and one Android, on mobile data rather than office Wi-Fi. Open a product, rotate it, change a finish, place it in AR, then try the QR code from a laptop.
7. **Watch the orders report** for a few weeks before you roll 3D out to the rest of the catalogue.

Start with one product: the one with the most options and the most "will it fit?" questions from customers. That product will tell you more than the next fifty.

## What do you need before you start?

You need 3D models of your products, a Shopify catalogue with clean SKUs or handles, and a short list of the products where shoppers hesitate most. The models are the only part that takes real time.

**3D models.** You have two routes:

- **Bring your own.** If your manufacturer or design team already has models, export them as GLB for the web viewer and Android AR, and USDZ for iPhone AR where you can. Build them at real-world scale, because AR places the product at whatever size the file says. Keep them light: compressed geometry and textures matter more on a phone than polygon detail you can't see. Our guide on [preparing a 3D model for the web](/blog/how-to-prepare-a-3d-model-for-the-web) covers the pipeline.
- **Have them made.** If all you have is CAD drawings, spec sheets or photos, Thridify's [3D modelling service](/services/3d-modelling) builds web-ready models with the materials set up for the configurator.

**Clean product data.** Matching runs on SKU, handle, product ID or title. If your SKUs are consistent, matching is close to automatic. If half your products are called "Copy of Sofa 2", tidy them up first. It's an hour well spent.

**Variants that mean something.** A configurator is only as good as the options behind it. If "Colour: Option 3" is how your variants are labelled today, rename them to what a customer would actually say.

## How does it work for furniture stores?

For furniture, 3D answers the two questions that stall a sofa or wardrobe sale: what will it look like in my fabric, and will it fit in my room. The configurator handles the first and AR handles the second.

Put the configurator on products that come in several fabrics or leg finishes, since that's where shoppers spend longest deciding. Use AR on anything large enough that people measure their wall before buying. The measure tool in the viewer helps the shoppers who still want a number. More on this in [3D for furniture brands](/industries/furniture).

## How does it work for kitchen brands?

For kitchens, the value is in showing shutter finishes, handles and worktops together, because customers struggle to picture a laminate swatch as a full run of cabinets. A configurator that swaps the finish across the whole unit closes that gap.

Model the units your customers buy most and let them change shutter, handle and countertop materials. AR helps with standalone pieces like islands and tall units, so a buyer can check clearance. See [3D for modular kitchens](/industries/modular-kitchens).

## How does it work for doors and windows?

For doors and windows, a configurator shows frame colour, glazing, hardware and panel style on one model, which matters because buyers order these made to measure and can't return a mistake easily. AR lets them see the door against their actual entrance.

Keep the options that change the look in the configurator. Leave structural specifications that don't change the look to the product description or the quote. The [door and window configurator guide](/blog/how-to-build-a-door-and-window-configurator) goes into how to structure the options, and the [doors and windows page](/industries/doors-and-windows) shows examples.

## How does it work for bathroom fittings?

For basins, taps, showers and vanities, 3D shows finish and form better than a white-background photo. Chrome, matte black and brushed gold read differently once a shopper can turn the tap and see the light move across it.

AR earns its place on vanities and freestanding tubs, where the buyer is checking that a piece fits the space. Taps and mixers benefit most from the finish switcher. More on [3D for sanitaryware](/industries/sanitaryware).

## How does it work for tiles?

For tiles, the configurator lets shoppers switch between colours and finishes on a sample product and inspect the surface texture up close, which a flat product shot struggles to show. Zoom matters more here than rotation, since the surface is the product.

Model a representative piece or panel, set up each colourway as an option, and make sure the texture maps are high enough resolution to survive the zoom. The same thinking applies to laminates and veneers, covered in our [laminate and veneer visualiser guide](/blog/how-to-build-a-laminate-and-veneer-visualiser).

## How does it work for lighting?

For lighting, 3D shows shape, scale and finish, and AR answers the question every pendant buyer has: how big will it look over my table? Photos make a 40 cm pendant and a 60 cm pendant look nearly the same.

Use the configurator for shade colour and metal finish. Use AR for pendants, floor lamps and chandeliers, where the size against the room is most of the decision.

## How do you know if 3D and AR are working?

Look at the orders that followed a 3D or AR view next to the orders that didn't. The Thridify app reports this split so you can compare the two groups on your own store, rather than relying on industry averages.

Give it a few weeks and enough traffic before you draw a conclusion. Also look at which products get the most 3D views: those are the ones customers needed help imagining, and they're the next candidates for better models or more options.

## Frequently asked questions

### Do I need to edit my Shopify theme code to add 3D and AR?

No. The Thridify app works through an app embed or theme blocks that you place in the Shopify theme editor. Nothing in your theme files changes.

### What 3D file formats does the Shopify app use?

GLB for the web viewer and Android AR, and USDZ for AR on iPhone. If you don't have models, Thridify's 3D modelling service can build them from spec sheets, CAD or photos.

### Does AR work on both iPhone and Android?

Yes. On a phone the shopper taps "View in your room" and the native AR viewer opens. On a desktop they scan a QR code, and the product opens on their phone ready to place.

### How does the app know which 3D model belongs to which product?

It matches models to Shopify products by SKU, handle, product ID or title. You can check and correct matches, and resync after you add products or change variants.

### Can shoppers change finishes and materials in 3D?

Yes. The live configurator switches finishes, materials and variants on the 3D model, and the choices stay in step with your Shopify variants so the cart matches what the shopper configured.

### Is there a free plan?

Yes, the Thridify app on the Shopify App Store has a free plan. Check the [listing](https://apps.shopify.com/thridify-3d-ar-configurator) for current plan details.

### Which industries is it built for?

Products where size, finish or fit drives the decision: furniture, modular kitchens, doors and windows, bathroom fittings, tiles and lighting are the main ones. The setup is the same for any product you have a 3D model of.

## Where to go next

Install the [Thridify 3D & AR configurator app](https://apps.shopify.com/thridify-3d-ar-configurator) and try it on one product. For how the app fits with the rest of the platform, see the [Shopify integration page](/integrations/shopify). If you'd rather walk through your catalogue with us first, [get in touch](/contact).
