import type { Product, KitchenConfiguration, ProductCategory } from '../data/products';

export interface KitchenConfigContextData {
  type: 'kitchen-config';
  configuration: KitchenConfiguration;
}

export interface HardwareProductContextData {
  type: 'hardware-product';
  product: Product;
  category?: ProductCategory;
}

export interface CategoryContextData {
  type: 'category';
  category: ProductCategory;
}

export interface GeneralContextData {
  type: 'general';
}

export type MessageContextData =
  | KitchenConfigContextData
  | HardwareProductContextData
  | CategoryContextData
  | GeneralContextData;

/**
 * Normalizes configuration name into natural phrasing.
 * e.g. "Island" -> "Island Kitchen", "Single Wall" -> "Single Wall Kitchen"
 */
function formatKitchenName(name: string): string {
  const trimmed = name.trim();
  if (/kitchen$/i.test(trimmed)) return trimmed;
  return `${trimmed} Kitchen`;
}

/**
 * Formats greeting line according to customer name presence.
 */
function buildGreeting(customerName?: string): string {
  const name = customerName?.trim();
  if (name) {
    return `Hello Surfuria Team,\n\nMy name is ${name}, and I'm`;
  }
  return `Hello Surfuria Team,\n\nI'm`;
}

/**
 * Formats sign-off according to customer name presence.
 */
function buildSignOff(customerName?: string): string {
  const name = customerName?.trim();
  if (name) {
    return `Thank you,\n${name}`;
  }
  return 'Thank you,';
}

/**
 * Generates a context-aware enquiry message for kitchen configurations.
 */
export function generateKitchenConfigMessage(
  config: KitchenConfiguration,
  customerName?: string
): string {
  const greeting = buildGreeting(customerName);
  const signOff = buildSignOff(customerName);
  const kitchenName = formatKitchenName(config.name);

  return `${greeting} interested in your ${kitchenName} configuration.

I'd like to understand more about the materials, finishes, included hardware and installation process.

Could you also help me understand whether this configuration can be customised according to my kitchen dimensions and requirements?

My requirements:

- Kitchen dimensions / available space:
- Preferred materials or finishes:
- Location:
- Any specific requirements:

Please share the details and guide me on the next steps.

${signOff}`;
}

/**
 * Generates a context-aware enquiry message for individual hardware products.
 */
export function generateHardwareProductMessage(
  product: Product,
  category?: ProductCategory,
  customerName?: string
): string {
  const greeting = buildGreeting(customerName);
  const signOff = buildSignOff(customerName);
  const categoryClause = category?.name ? ` from your ${category.name} collection` : '';

  return `${greeting} interested in your ${product.name}${categoryClause}.

I'd like to know more about its specifications, available sizes and finishes, and whether it would be suitable for my application.

Could you also share the pricing and availability?

My requirements:

- Intended application:
- Required quantity:
- Preferred size or finish:
- Any specific requirements:

Please help me understand the available options.

${signOff}`;
}

/**
 * Generates a context-aware enquiry message for category-level enquiries.
 */
export function generateCategoryMessage(
  category: ProductCategory,
  customerName?: string
): string {
  const greeting = buildGreeting(customerName);
  const signOff = buildSignOff(customerName);

  return `${greeting} interested in exploring your ${category.name} collection.

I'd like to understand the available options, specifications, and recommendations suitable for my upcoming project.

Could you also share pricing, minimum order quantities, and catalogue availability?

My requirements:

- Application / project type:
- Estimated quantity or dimensions:
- Preferred finish or material:
- Location:
- Any specific requirements:

Please share the catalogue details and guide me on the most suitable options.

${signOff}`;
}

/**
 * Generates a natural enquiry message for general contact page visits.
 */
export function generateGeneralMessage(customerName?: string): string {
  const name = customerName?.trim();
  const greeting = name
    ? `Hello Surfuria Team,\n\nMy name is ${name}, and I'm reaching out regarding your architectural solutions.`
    : `Hello Surfuria Team,\n\nI'm reaching out regarding your architectural solutions.`;
  const signOff = buildSignOff(customerName);

  return `${greeting}

I'd like to learn more about your offerings and understand the best solution for my upcoming project.

My project details:

- Area of interest (Modular Kitchens / Architectural Hardware / Custom Millwork):
- Project stage / timeline:
- Location:
- Brief overview of requirements:

Please share more details and guide me on the next steps.

${signOff}`;
}

/**
 * Main dispatcher to generate enquiry message based on context data.
 */
export function generateEnquiryMessage(
  context: MessageContextData,
  customerName?: string
): string {
  switch (context.type) {
    case 'kitchen-config':
      return generateKitchenConfigMessage(context.configuration, customerName);
    case 'hardware-product':
      return generateHardwareProductMessage(context.product, context.category, customerName);
    case 'category':
      return generateCategoryMessage(context.category, customerName);
    case 'general':
    default:
      return generateGeneralMessage(customerName);
  }
}

/**
 * Safely updates customer name in an existing message, preserving all
 * user edits and custom requirements.
 */
export function updateMessageCustomerName(
  currentMessage: string,
  newName: string
): string {
  const trimmedNewName = newName.trim();

  // Pattern 1: Greeting line
  // Matches "Hello Surfuria Team,\n\nMy name is <Name>, and I'm" OR "Hello Surfuria Team,\n\nI'm"
  const greetingWithNameRegex = /^(Hello Surfuria Team,\s*\n\s*\n)My name is [^,\r\n]+,\s*and\s+(I'm|I am|I would|I'd)/i;
  const greetingWithoutNameRegex = /^(Hello Surfuria Team,\s*\n\s*\n)(I'm|I am|I would|I'd)/i;

  // General greeting special case
  const generalGreetingWithNameRegex = /^(Hello Surfuria Team,\s*\n\s*\n)My name is [^,\r\n]+,\s*and\s+I'm reaching out/i;
  const generalGreetingWithoutNameRegex = /^(Hello Surfuria Team,\s*\n\s*\n)I'm reaching out/i;

  let updated = currentMessage;

  if (trimmedNewName) {
    // Adding or replacing name in greeting
    if (generalGreetingWithNameRegex.test(updated)) {
      updated = updated.replace(
        generalGreetingWithNameRegex,
        `$1My name is ${trimmedNewName}, and I'm reaching out`
      );
    } else if (generalGreetingWithoutNameRegex.test(updated)) {
      updated = updated.replace(
        generalGreetingWithoutNameRegex,
        `$1My name is ${trimmedNewName}, and I'm reaching out`
      );
    } else if (greetingWithNameRegex.test(updated)) {
      updated = updated.replace(
        greetingWithNameRegex,
        `$1My name is ${trimmedNewName}, and $2`
      );
    } else if (greetingWithoutNameRegex.test(updated)) {
      updated = updated.replace(
        greetingWithoutNameRegex,
        `$1My name is ${trimmedNewName}, and $2`
      );
    }
  } else {
    // Removing name from greeting
    if (generalGreetingWithNameRegex.test(updated)) {
      updated = updated.replace(
        generalGreetingWithNameRegex,
        `$1I'm reaching out`
      );
    } else if (greetingWithNameRegex.test(updated)) {
      updated = updated.replace(
        greetingWithNameRegex,
        `$1$2`
      );
    }
  }

  // Pattern 2: Sign-off line
  // Matches "Thank you,\n<Any Name>" OR "Thank you," at the end
  const signOffRegex = /(\n\s*Thank you,)(?:\s*\n[^\r\n]+)?\s*$/i;

  if (signOffRegex.test(updated)) {
    if (trimmedNewName) {
      updated = updated.replace(signOffRegex, `$1\n${trimmedNewName}`);
    } else {
      updated = updated.replace(signOffRegex, `$1`);
    }
  }

  return updated;
}
