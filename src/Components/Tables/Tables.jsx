import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  Button,
  TextField,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import CountComp from "../CountComponent/CountComp";

const Tables = () => {
  const initialTables = [
    { name: "Table 1", capacity: 4 },
    { name: "Table 2", capacity: 6 },
    { name: "Table 3", capacity: 2 },
    { name: "Table 4", capacity: 8 },
    { name: "Table 5", capacity: 4 },
    { name: "Table 6", capacity: 6 },
    { name: "Table 7", capacity: 2 },
    { name: "Table 8", capacity: 8 },
  ].map((table, idx) => ({ ...table, id: idx + 1 }));

  const [tables] = useState(initialTables);
  const [orders, setOrders] = useState({});
  const [menu, setMenu] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("userInfo"));

  const calculateBill = (tableId) => {
    const items = orders[tableId] || [];
    return items.reduce((sum, item) => sum + (item.total || item.price), 0);
  };

  const getFood = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/recepie/getOrgFoods/${user.orgid}/${user.wallid}`,
        { headers: { "Cache-Control": "no-cache" } }
      );
      if (res.status === 200) {
        setMenu(res.data.data.filter((fil) => fil.status === "A"));
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleAddItems = (tableId, selectedItems) => {
    setOrders((prev) => {
      const prevItems = prev[tableId] || [];
      const newItems = selectedItems
        .filter((item) => !prevItems.some((i) => i.title === item.title))
        .map((item) => ({ ...item, count: 1, total: item.price }));
      return { ...prev, [tableId]: [...prevItems, ...newItems] };
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, background: "#f0f4f8", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={5}
        sx={{ color: "#1565c0" }}
      >
        🍽️ Table Management
      </Typography>

      <Grid container spacing={3}>
        {tables.map((table) => (
          <Grid item xs={12} sm={6} md={3} key={table.id}>
            <Card
              sx={{
                borderRadius: 4,
                p: 3,
                background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                },
                display: "flex",
                flexDirection: "column",
                height: "520px",
                maxWidth: "480px",
              }}
            >
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "#00acc1",
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <FontAwesomeIcon icon={faBowlFood} style={{ fontSize: "28px", color: "#fff" }} />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" color="#00796b">
                  {table.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Capacity: {table.capacity}
                </Typography>
              </Box>

              {/* Menu Selector */}
              <Autocomplete
                multiple
                options={menu}
                disableCloseOnSelect
                limitTags={1}
                getOptionLabel={(option) => `${option.title} - ₹${option.price}`}
                onChange={(event, selectedItems) => handleAddItems(table.id, selectedItems)}
                renderTags={() => null}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} sx={{ mr: 1 }} />
                    {option.title} - ₹{option.price}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="➕ Add Items"
                    placeholder="Search food..."
                    size="small"
                    sx={{
                      mb: 2,
                      ".MuiInputBase-root": { paddingTop: "4px", paddingBottom: "4px" },
                    }}
                  />
                )}
                sx={{
                  width: { xs: "100%", sm: "400px", md: "500px", lg: "200px" },
                  ".MuiChip-root": { display: "none" },
                }}
              />


              {/* Orders List */}
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  pr: 1,
                }}
              >
                {orders[table.id]?.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 3,
                      bgcolor: "#f1f8e9",
                      boxShadow: "inset 0 1px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <Typography variant="body2" fontWeight="500" color="#33691e">
                      {item.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {/* <Typography variant="body2" color="#558b2f">
                        ₹{item.total || item.price}
                      </Typography> */}
                      <CountComp
                        itemPrice={item.price}
                        onTotalChange={(total, count) => {
                          setOrders((prev) => {
                            const updatedItems = [...(prev[table.id] || [])];
                            updatedItems[idx] = { ...updatedItems[idx], total, count };
                            return { ...prev, [table.id]: updatedItems };
                          });
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Footer */}
              {orders[table.id]?.length > 0 && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body1" fontWeight="bold" textAlign="center" color="#004d40">
                    Total: ₹{calculateBill(table.id)}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1.5,
                      py: 1.2,
                      fontSize: "0.95rem",
                      borderRadius: 3,
                      background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                      color: "#fff",
                      "&:hover": {
                        background: "linear-gradient(90deg, #185a9d 0%, #43cea2 100%)",
                      },
                    }}
                    onClick={() => alert(`Bill Generated: ₹${calculateBill(table.id)}`)}
                  >
                    Generate Bill
                  </Button>
                </>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tables;
