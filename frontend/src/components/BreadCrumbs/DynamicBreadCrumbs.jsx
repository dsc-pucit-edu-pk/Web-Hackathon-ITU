import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

export default function DynamicBreadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  const pathList = pathname.split("/").filter((path) => path);
  const breadcrumbs = pathList.map((path, index) => {
    const link = `/${pathList.slice(0, index + 1).join("/")}`;
    const isLast = index === pathList.length - 1;
    const color = isLast ? "red" : "inherit";
    return (
      <Link color={color} to={link} key={path}>
        {isLast ? <span style={{ color: "red" }}>{path}</span> : path}
      </Link>
    );
  });

  return (
    <div className={`${pathname.includes("/account/ads/") && !pathname.includes("/pick-a-category") ? "px-72 mb-6 lg:flex hidden" : ""} mt-4`}>
      {pathname!="/" && pathname!="/messenger" && pathname!="/disabled" && (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to={"/"}>
            Home
          </Link>
          {breadcrumbs}
        </Breadcrumbs>
      )}
    </div>
  );
}