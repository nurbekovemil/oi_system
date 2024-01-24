import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useLazyGlobalSearchQuery } from "../../store/services/search-service";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();
  const [globalSearch, { isLoading, isSuccess }] = useLazyGlobalSearchQuery();
  const [searchText, setSearchText] = useState("");
  const handlerSearch = (value) => {
    if (value.length >= 3) {
      globalSearch(value);
    }
    if (isSuccess) {
      navigate("/dashboard/search");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/search");
    }
  }, [isSuccess]);
  return (
    <Input.Search
      loading={isLoading}
      size="middle"
      placeholder="Введите текст"
      enterButton="Поиск"
      onSearch={handlerSearch}
    />
  );
};
export default Search;
