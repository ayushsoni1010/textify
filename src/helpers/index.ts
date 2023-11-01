const helpers: any = {
  validEmail: (email: string): boolean => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const specials = /[*|\":<>[\]{}`\\()';&$]/;
    return pattern.test(email) && !specials.test(email);
  },
  apiURL:
    process.env.NODE_ENV !== "production"
      ? `http://localhost:3000`
      : `https://${window.location.host}`,
};

export { helpers };
