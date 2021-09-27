{userInfo && userInfo.isSeller&&(
    <div className="dropdown">
      <Link to="#seller">
        Seller <i className="fa fa-caret-down"></i>
      </Link>
      <ul className="dropdown-content">
        <li>
          <Link to="/productlist/seller">Products</Link>
        </li>
        <li>
          <Link to="/orderlist/seller">Orders</Link>
        </li>
      </ul>
    </div>
  )}
  
  {userInfo && userInfo.isAdmin && (
    <div className="dropdown">
      <Link to="#admin">
        Admin <i className="fa fa-caret-down"></i>
      </Link>
      <ul className="dropdown-content">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/productlist">Products</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
        <li>
          <Link to="/userlist">Users</Link>
        </li>
      
      </ul>
    </div>
  )}
  <div className="dropdown">
      <Link to="#">
        Categories <i className="fa fa-caret-down"></i>
      </Link>
      <ul className="dropdown-content">
        {categories&&
        categories.map((c)=><li>
          <Link to={`/search/category/${c.name}`}>{c.name}</Link>
        </li>)}
        
      
      </ul>
    </div>
