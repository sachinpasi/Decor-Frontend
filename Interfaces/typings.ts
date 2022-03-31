import { IconType } from "react-icons/lib";

export type INavLink = {
  href: string;
  name: string;
};

export type ClientCategoryItem = {
  href: string;
  name: string;
  isActive?: boolean;
};

export type IUser = {
  isLoggedIn: boolean;
  role: string | null;
  token: string | null;
  userId: string | null;
};

export type IAuth = {
  email: string;
  password: string;
  name?: string;
};

export type IAdminUser = {
  User: {
    name: string;
    email: string;
    phoneNumber: number;
    role: string;
  };
};

export type IAdminSidebarItem = {
  title: string;
  href?: any;
  Icon: IconType;
  onClick?: (ev: React.MouseEvent) => void;
};

export type IAdminHeaderType = {
  HeaderData: {
    Title: string;
    Links: {
      Title: string;
      Href: string;
      Icon?: IconType;
    }[];
    Button: {
      Title: string;
    }[];
    Delete: {
      Title: string;
      Icon?: IconType;
      onClick?: (ev: React.MouseEvent) => void;
    }[];
  };
  ActiveCategory?: string;
  setActiveCategory: (value: string) => void;
};

export type IAdminSearchType = {
  Placeholder: string;
};

export type ICategory = {
  categories: {
    _id: string;
    name: string;
    productCount: number;
  }[];
};

export type IProductList = {
  products: {
    _id: string;
    name: string;
    price: number;
    displayPhoto: {
      secure_url: string;
    };
  }[];
};

export type IProductDetails = {
  product: {
    name: string;
    price: number;
    description: string;
    displayPhoto: {
      secure_url: string;
    };
    photos: {
      secure_url: string;
    }[];
    _id: string;
  };
};

export type IShop = {
  products: {
    _id: string;
    name: string;
    price: number;
    displayPhoto: {
      secure_url: string;
    };
  }[];
  categories: {
    _id: string;
    name: string;
    productCount: number;
  }[];
};

export type ICartReducer = {
  items: {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
  }[];
};

export type IStock = {
  id: string | undefined;
  addBy: number | string;
};

export type IOrderList = {
  orders: {}[];
};

export type OrderItem = {
  order: {
    orderItems: {
      name: string;
      image: string;
      price: number;
      quantity: number;
      productId: string;
    }[];
    _id: string;
    orderId: string;
    totalAmount: number;
    createdAt: string;
  };
};
