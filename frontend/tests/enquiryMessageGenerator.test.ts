import { describe, it, expect } from 'vitest';
import {
  generateEnquiryMessage,
  updateMessageCustomerName,
} from '../src/lib/enquiryMessageGenerator';
import {
  getKitchenConfigurationBySlug,
  getProductBySlug,
  getCategoryById,
} from '../src/data/products';

describe('SURFURIA — Enquiry Message Generator Suite', () => {
  // Scenario 1: Island Kitchen with customer name
  it('generates personalized message for Island Kitchen when customer name is provided', () => {
    const config = getKitchenConfigurationBySlug('island')!;
    expect(config).toBeDefined();

    const msg = generateEnquiryMessage(
      { type: 'kitchen-config', configuration: config },
      'Tanmay Shukla'
    );

    expect(msg).toContain('Hello Surfuria Team,');
    expect(msg).toContain("My name is Tanmay Shukla, and I'm interested in your Island Kitchen configuration.");
    expect(msg).toContain('materials, finishes, included hardware and installation process');
    expect(msg).toContain('customised according to my kitchen dimensions');
    expect(msg).toContain('Kitchen dimensions / available space:');
    expect(msg).toContain('Preferred materials or finishes:');
    expect(msg).toContain('Location:');
    expect(msg).toContain('Any specific requirements:');
    expect(msg).toContain('Thank you,\nTanmay Shukla');
  });

  // Scenario 2: Island Kitchen without customer name
  it('generates natural message for Island Kitchen when customer name is omitted', () => {
    const config = getKitchenConfigurationBySlug('island')!;
    const msg = generateEnquiryMessage(
      { type: 'kitchen-config', configuration: config },
      ''
    );

    expect(msg).toContain('Hello Surfuria Team,');
    expect(msg).toContain("I'm interested in your Island Kitchen configuration.");
    expect(msg).not.toContain('My name is');
    expect(msg).toContain('Thank you,');
    expect(msg).not.toContain('Thank you,\n');
  });

  // Scenario 3: L-Shaped Kitchen CTA
  it('generates accurate message for L-Shaped Kitchen', () => {
    const config = getKitchenConfigurationBySlug('l-shaped')!;
    const msg = generateEnquiryMessage(
      { type: 'kitchen-config', configuration: config },
      'Priya Sharma'
    );

    expect(msg).toContain("My name is Priya Sharma, and I'm interested in your L-Shaped Kitchen configuration.");
    expect(msg).toContain('Thank you,\nPriya Sharma');
  });

  // Scenario 4: Single Wall Kitchen CTA
  it('generates accurate message for Single Wall Kitchen', () => {
    const config = getKitchenConfigurationBySlug('single-wall')!;
    const msg = generateEnquiryMessage(
      { type: 'kitchen-config', configuration: config }
    );

    expect(msg).toContain("I'm interested in your Single Wall Kitchen configuration.");
    expect(msg).toContain('Thank you,');
  });

  // Scenario 5: U-Shaped Kitchen CTA
  it('generates accurate message for U-Shaped Kitchen', () => {
    const config = getKitchenConfigurationBySlug('u-shaped')!;
    const msg = generateEnquiryMessage(
      { type: 'kitchen-config', configuration: config },
      'Rohan Roy'
    );

    expect(msg).toContain("My name is Rohan Roy, and I'm interested in your U-Shaped Kitchen configuration.");
    expect(msg).toContain('Thank you,\nRohan Roy');
  });

  // Scenario 6: Individual hardware product CTA
  it('generates product-specific message using real hardware product data', () => {
    const product = getProductBySlug('hydraulic-soft-close-hinge')!;
    expect(product).toBeDefined();
    const category = getCategoryById(product.categoryId);

    const msg = generateEnquiryMessage(
      { type: 'hardware-product', product, category },
      'Tanmay Shukla'
    );

    expect(msg).toContain(`My name is Tanmay Shukla, and I'm interested in your ${product.name}`);
    expect(msg).toContain('specifications, available sizes and finishes');
    expect(msg).toContain('pricing and availability');
    expect(msg).toContain('Intended application:');
    expect(msg).toContain('Required quantity:');
    expect(msg).toContain('Preferred size or finish:');
    expect(msg).toContain('Thank you,\nTanmay Shukla');
  });

  // Scenario 7: Hardware category CTA
  it('generates category-level enquiry message', () => {
    const category = getCategoryById('cabinet-hinges')!;
    expect(category).toBeDefined();

    const msg = generateEnquiryMessage(
      { type: 'category', category },
      'Ananya Verma'
    );

    expect(msg).toContain(`My name is Ananya Verma, and I'm interested in exploring your ${category.name} collection.`);
    expect(msg).toContain('Application / project type:');
    expect(msg).toContain('Estimated quantity or dimensions:');
    expect(msg).toContain('Preferred finish or material:');
    expect(msg).toContain('Thank you,\nAnanya Verma');
  });

  // Scenario 8: General Contact page without context
  it('generates natural concise introductory message for general visits', () => {
    const msg = generateEnquiryMessage({ type: 'general' }, 'Vikram Malhotra');

    expect(msg).toContain("My name is Vikram Malhotra, and I'm reaching out regarding your architectural solutions.");
    expect(msg).toContain('Area of interest (Modular Kitchens / Architectural Hardware / Custom Millwork):');
    expect(msg).toContain('Project stage / timeline:');
    expect(msg).toContain('Location:');
    expect(msg).toContain('Thank you,\nVikram Malhotra');

    const msgNoName = generateEnquiryMessage({ type: 'general' });
    expect(msgNoName).toContain("I'm reaching out regarding your architectural solutions.");
    expect(msgNoName).toContain('Thank you,');
  });

  // Scenario 9: Customer changes name after initial message is generated
  it('updates customer name in greeting and sign-off cleanly', () => {
    const config = getKitchenConfigurationBySlug('island')!;
    const initialMsg = generateEnquiryMessage({ type: 'kitchen-config', configuration: config }, '');

    expect(initialMsg).toContain("I'm interested in your Island Kitchen");
    expect(initialMsg).toContain('Thank you,');

    // Customer types "Tanmay"
    const updatedWithTanmay = updateMessageCustomerName(initialMsg, 'Tanmay');
    expect(updatedWithTanmay).toContain("My name is Tanmay, and I'm interested in your Island Kitchen");
    expect(updatedWithTanmay).toContain('Thank you,\nTanmay');

    // Customer changes to "Tanmay Shukla"
    const updatedWithFullName = updateMessageCustomerName(updatedWithTanmay, 'Tanmay Shukla');
    expect(updatedWithFullName).toContain("My name is Tanmay Shukla, and I'm interested in your Island Kitchen");
    expect(updatedWithFullName).toContain('Thank you,\nTanmay Shukla');

    // Customer clears name
    const cleared = updateMessageCustomerName(updatedWithFullName, '');
    expect(cleared).toContain("I'm interested in your Island Kitchen");
    expect(cleared).not.toContain('My name is');
    expect(cleared).toContain('Thank you,');
    expect(cleared).not.toContain('Thank you,\n');
  });

  // Scenario 10: Customer manually edits the message and subsequently changes their name
  it('preserves user custom edits when name is subsequently modified', () => {
    const config = getKitchenConfigurationBySlug('island')!;
    const initialMsg = generateEnquiryMessage({ type: 'kitchen-config', configuration: config }, 'Tanmay');

    // User customizes the requirements section manually
    const userEditedMsg = initialMsg.replace(
      '- Kitchen dimensions / available space:',
      '- Kitchen dimensions / available space: 14ft x 12ft (L-shaped island layout)'
    ).replace(
      '- Location:',
      '- Location: South Mumbai'
    );

    expect(userEditedMsg).toContain('14ft x 12ft (L-shaped island layout)');
    expect(userEditedMsg).toContain('South Mumbai');

    // User now changes their name to "Tanmay Shukla"
    const updated = updateMessageCustomerName(userEditedMsg, 'Tanmay Shukla');

    // Greeting and sign-off are updated
    expect(updated).toContain("My name is Tanmay Shukla, and I'm interested in your Island Kitchen");
    expect(updated).toContain('Thank you,\nTanmay Shukla');

    // Crucially, user custom edits MUST BE 100% PRESERVED
    expect(updated).toContain('- Kitchen dimensions / available space: 14ft x 12ft (L-shaped island layout)');
    expect(updated).toContain('- Location: South Mumbai');
  });

  it('preserves completely custom messages if user rewrites the entire text', () => {
    const customText = 'Please call me at 9820012345 regarding bulk pricing for hotel villa project.';
    const updated = updateMessageCustomerName(customText, 'Tanmay Shukla');
    expect(updated).toBe(customText);
  });
});
