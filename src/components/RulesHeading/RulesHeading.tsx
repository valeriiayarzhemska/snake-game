import { Heading, Kbd } from '@chakra-ui/react';

export interface IRulesHeading {
  headingText: string;
  kbdText?: string;
}

export const RulesHeading = ({ headingText, kbdText }: IRulesHeading) => (
  <>
    {kbdText ? (
      <Heading as="h5" size="md" mt={3}>
        {headingText}<Kbd>{kbdText}</Kbd>
      </Heading>
    ) : (
      <Heading as="h5" size="md" mt={3}>
        {headingText}
      </Heading>
    )}
  </>
);
