export type EmployeeType = {
  id: number;
  name: string;
  avatar_url: "https://eu.ui-avatars.com/api/?name=" & string;
  position: string;
  service_ids: number[];
};

export type ServiceType = {
  id: number;
  name: string;
  website_url: "http://" & string;
  logo_url: "https://" & string;
  price: {
    cost_per_user: number;
    flat_cost: number;
    nb_users_included: number;
  };
};
