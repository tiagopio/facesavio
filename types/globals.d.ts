export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      id?: string;
    };
  }

  interface UserPublicMetadata {
    onboardingComplete?: boolean;
    id?: string;
  }
}