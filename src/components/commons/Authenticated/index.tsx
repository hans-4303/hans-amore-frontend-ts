import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "@store/index";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import { Slide } from "@mui/material";

interface AuthenticatedProps {
  children: ReactNode;
}

export const Authenticated: FC<AuthenticatedProps> = ({ children }) => {
  return <>{children}</>;
};
