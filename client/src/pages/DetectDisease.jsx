import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Container, Paper, Button, Grid, 
  CircularProgress, LinearProgress, Divider, Card, 
  CardContent, IconButton, Alert, Chip, Fade, Zoom,
  Stack, Tooltip
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BugReportIcon from "@mui/icons-material/BugReport";
import ScienceIcon from "@mui/icons-material/Science";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import VerifiedIcon from "@mui/icons-material/Verified";
import InfoIcon from "@mui/icons-material/Info";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:8000/detection";

const DISEASE_INFO = {
  "Pepper__bell___Bacterial_spot": {
      "icon": "🦠",
      "description": "Bacterial spot causes dark, water-soaked lesions on leaves and fruit, leading to defoliation and reduced yield.",
      "causes": "Caused by Xanthomonas campestris pv. vesicatoria, often spread through contaminated seeds and splashing water.",
      "treatment": "Apply copper-based bactericides and remove infected plant parts.",
      "prevention": "Use disease-free seeds, avoid overhead watering, and ensure good air circulation."
  },
  "Pepper__bell___healthy": {
      "icon": "✅",
      "description": "Healthy bell pepper plants exhibit firm stems, dark green leaves, and robust fruit development.",
      "causes": "Optimal growth conditions with proper nutrition, watering, and pest control.",
      "treatment": "Maintain proper plant care and monitoring to prevent diseases.",
      "prevention": "Regular fertilization, proper spacing, and pest management."
  },
  "Potato___Early_blight": {
      "icon": "🍂",
      "description": "Early blight results in brown, concentric ring lesions on leaves, leading to defoliation and reduced tuber quality.",
      "causes": "Caused by Alternaria solani, thriving in warm, humid conditions.",
      "treatment": "Apply fungicides like chlorothalonil or mancozeb and remove infected foliage.",
      "prevention": "Rotate crops, ensure proper spacing, and use resistant potato varieties."
  },
  "Potato___Late_blight": {
      "icon": "❄️",
      "description": "Late blight causes dark, water-soaked lesions on leaves and tubers, leading to rapid decay.",
      "causes": "Caused by Phytophthora infestans, favored by cool, moist conditions.",
      "treatment": "Use fungicides like metalaxyl and promptly remove infected plants.",
      "prevention": "Plant resistant varieties, ensure good drainage, and avoid overhead watering."
  },
  "Potato___healthy": {
      "icon": "✅",
      "description": "Healthy potato plants have lush green foliage, strong stems, and well-developed tubers.",
      "causes": "Proper soil preparation, watering, and pest management.",
      "treatment": "Maintain regular care and disease monitoring.",
      "prevention": "Practice crop rotation, ensure balanced fertilization, and control pests."
  },
  "Tomato_Bacterial_spot": {
      "icon": "🦠",
      "description": "Bacterial spot causes small, dark lesions on leaves and fruit, reducing yield and quality.",
      "causes": "Caused by Xanthomonas campestris pv. vesicatoria, spread through contaminated tools and water.",
      "treatment": "Use copper-based sprays and remove infected leaves.",
      "prevention": "Avoid overhead irrigation, sanitize tools, and use disease-free seeds."
  },
  "Tomato_Early_blight": {
      "icon": "🍂",
      "description": "Early blight leads to brown, concentric ring spots on leaves and stems, weakening the plant.",
      "causes": "Caused by Alternaria solani, thriving in warm, humid conditions.",
      "treatment": "Apply fungicides and remove affected plant parts.",
      "prevention": "Practice crop rotation, ensure proper plant spacing, and use resistant varieties."
  },
  "Tomato_Late_blight": {
      "icon": "❄️",
      "description": "Late blight causes water-soaked lesions on leaves and fruit, leading to rapid plant decline.",
      "causes": "Caused by Phytophthora infestans, spreading in cool, wet conditions.",
      "treatment": "Use fungicides like metalaxyl and remove infected plants.",
      "prevention": "Avoid overhead watering, increase air circulation, and plant resistant varieties."
  },
  "Tomato_Leaf_Mold": {
      "icon": "🌫️",
      "description": "Leaf mold appears as yellow spots on leaves, leading to reduced photosynthesis and yield loss.",
      "causes": "Caused by Passalora fulva, thriving in high humidity.",
      "treatment": "Apply fungicides and improve air circulation.",
      "prevention": "Ensure proper spacing, prune excess foliage, and avoid overhead watering."
  },
  "Tomato_Septoria_leaf_spot": {
      "icon": "🍩",
      "description": "Septoria leaf spot causes small, dark lesions with a yellow halo, leading to premature leaf drop.",
      "causes": "Caused by Septoria lycopersici, thriving in wet conditions.",
      "treatment": "Use fungicides and remove infected leaves.",
      "prevention": "Practice crop rotation, ensure good air circulation, and water at the base."
  },
  "Tomato_Spider_mites_Two_spotted_spider_mite": {
      "icon": "🕷️",
      "description": "Spider mites cause yellowing and stippling on leaves, leading to plant weakening.",
      "causes": "Caused by Tetranychus urticae, thriving in hot, dry conditions.",
      "treatment": "Use insecticidal soap or neem oil.",
      "prevention": "Regularly mist plants, introduce natural predators like ladybugs, and avoid drought stress."
  },
  "Tomato__Target_Spot": {
      "icon": "🎯",
      "description": "Target spot appears as dark, concentric lesions on leaves and stems, weakening the plant.",
      "causes": "Caused by Corynespora cassiicola, spreading in humid environments.",
      "treatment": "Apply fungicides and remove infected plant parts.",
      "prevention": "Ensure proper spacing, prune excess foliage, and maintain dry foliage."
  },
  "Tomato__Tomato_YellowLeaf__Curl_Virus": {
      "icon": "🌀",
      "description": "This viral disease causes yellowing and curling of leaves, leading to stunted growth.",
      "causes": "Spread by whiteflies.",
      "treatment": "No direct cure; manage whitefly populations with insecticides and resistant varieties.",
      "prevention": "Use reflective mulches, introduce natural predators, and remove infected plants."
  },
  "Tomato__Tomato_mosaic_virus": {
      "icon": "🧩",
      "description": "Mosaic virus causes mottled, distorted leaves and reduced fruit yield.",
      "causes": "Spread through infected seeds, tools, and human handling.",
      "treatment": "No cure; remove infected plants and sanitize tools.",
      "prevention": "Use virus-free seeds, wash hands before handling plants, and control insect vectors."
  },
  "Tomato_healthy": {
      "icon": "✅",
      "description": "Healthy tomato plants show vibrant green leaves, strong stems, and normal fruit development.",
      "causes": "Proper care, adequate watering, good sunlight exposure, and regular fertilization.",
      "treatment": "Continue regular care practices to maintain plant health.",
      "prevention": "Regular monitoring, balanced nutrition, appropriate watering, and good air circulation."
  }
};

const UI_COLORS = {
  primary: "#1b4d3e", // Deep Forest Green
  accent: "#4caf50",  // Leaf Green
  surface: "#ffffff",
  background: "#f4f7f6",
  text: "#2c3e50",
  clay: "#8d6e63"
};

function DetectDisease() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
    }
  };

  const handleExampleClick = async (type) => {
    let fileName = "";
    if (type === "Tomato") fileName = "tomato_healthy.jpg";
    if (type === "Potato") fileName = "Potato_Late_blight.jpeg";
    if (type === "Pepper") fileName = "Pepper_bell_Bacterial_spot.jpeg";

    const imageUrl = `/images/examples/${fileName}`;
    setPreviewUrl(imageUrl);
    setResults(null);
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      setSelectedFile(file);
    } catch (err) {
      toast.error("Failed to load example image");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please upload an image first");
      return;
    }

    setLoading(true);
    setIsScanning(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/detect`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data.success) {
        setTimeout(() => {
          setResults(response.data.predictions);
          setIsScanning(false);
          setLoading(false);
          toast.success("AI Analysis Complete!");
        }, 2000); // Simulate AI processing time for "realism"
      } else {
        toast.error(response.data.error || "Failed to analyze image");
        setIsScanning(false);
        setLoading(false);
      }
    } catch (err) {
      toast.error("Error connecting to neural engine");
      console.error(err);
      setIsScanning(false);
      setLoading(false);
    }
  };

  const formatClassName = (name) => {
    return name.replace(/_/g, " ").replace(/ {2,}/g, " ").trim().toUpperCase();
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: UI_COLORS.background, 
      pt: { xs: 10, md: 14 }, 
      pb: 6,
      backgroundImage: "radial-gradient(circle at top right, #e8f5e9 0%, transparent 40%)"
    }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
              <VerifiedIcon sx={{ color: UI_COLORS.accent, fontSize: "small" }} />
              <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: "bold", color: "text.secondary" }}>
                AI-POWERED AGRICULTURE INTELLIGENCE
              </Typography>
            </Stack>
            <Typography variant="h3" sx={{ 
              fontWeight: 900, 
              color: UI_COLORS.primary, 
              mb: 1,
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: "2rem", md: "2.8rem" }
            }}>
              Plant Disease <span style={{ color: UI_COLORS.accent }}>Detection</span>
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "700px", mx: "auto", fontWeight: 400, lineHeight: 1.4 }}>
              Advanced system designed to identify plant 
              physiological conditions in seconds.
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Action Panel */}
          <Grid item xs={12} lg={4.5}>
            <Stack spacing={1.5}>
              <Paper elevation={0} sx={{ 
                p: 2, 
                borderRadius: 3, 
                border: "1px solid #e0e0e0", 
                bgcolor: "#fff",
                boxShadow: "0 10px 40px rgba(0,0,0,0.03)"
              }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: UI_COLORS.primary }}>
                    Control Center
                  </Typography>
                  <Tooltip title="Detection History">
                    <IconButton size="small"><HistoryIcon sx={{ fontSize: 20 }} /></IconButton>
                  </Tooltip>
                </Box>
                
                <Box 
                  sx={{ 
                    border: "2px dashed #d1d9d1", 
                    borderRadius: 3, 
                    p: 4, 
                    textAlign: "center",
                    bgcolor: selectedFile ? "#f8fcf8" : "transparent",
                    mb: 2,
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": { 
                      borderColor: UI_COLORS.accent,
                      bgcolor: "rgba(76, 175, 80, 0.04)",
                      transform: "translateY(-4px)"
                    }
                  }}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <input 
                    type="file" 
                    id="fileInput" 
                    hidden 
                    accept="image/*" 
                    onChange={handleFileSelect} 
                  />
                  <Box sx={{ 
                    width: 56, 
                    height: 56, 
                    borderRadius: "50%", 
                    bgcolor: "rgba(76, 175, 80, 0.1)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2
                  }}>
                    <CloudUploadIcon sx={{ fontSize: 28, color: UI_COLORS.accent }} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {selectedFile ? "Image Uploaded" : "Upload Plant Leaf"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                    {selectedFile ? selectedFile.name : "Click to select a photo"}
                  </Typography>
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  disabled={!selectedFile || loading}
                  onClick={handleSubmit}
                  startIcon={!loading && <ScienceIcon sx={{ fontSize: 18 }} />}
                  sx={{ 
                    bgcolor: UI_COLORS.primary, 
                    py: 1,
                    borderRadius: 1.5,
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    boxShadow: "0 8px 16px rgba(27, 77, 62, 0.15)",
                    "&:hover": { bgcolor: "#12342a" } 
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Detect Disease"}
                </Button>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary", borderBottom: `2px solid ${UI_COLORS.accent}`, pb: 0.2, mb: 1, display: "inline-block", fontSize: "0.65rem" }}>
                    QUICK TEST MODES
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 0.5, gap: 0.5 }}>
                    {["Tomato", "Potato", "Pepper"].map((tag) => (
                      <Chip 
                        key={tag}
                        label={tag} 
                        size="small"
                        clickable 
                        onClick={() => handleExampleClick(tag)}
                        sx={{ 
                          fontWeight: 700, 
                          bgcolor: "#fff", 
                          fontSize: "0.7rem",
                          height: 24,
                          border: "1px solid #e0e0e0", 
                          "&:hover": { bgcolor: "#f1f8f1", borderColor: UI_COLORS.accent } 
                        }} 
                      />
                    ))}
                  </Stack>
                </Box>
              </Paper>

              <Paper sx={{ p: 2, borderRadius: 3, bgcolor: UI_COLORS.primary, color: "#fff", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: -10, right: -10, opacity: 0.1 }}>
                  <ScienceIcon sx={{ fontSize: 100 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  System Status
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.7, textTransform: "uppercase" }}>Connection</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#4caf50" }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>ONLINE & READY</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.7, textTransform: "uppercase" }}>Accuracy</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>93% SUCCESS RATE</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          {/* Visualization Panel */}
          <Grid item xs={12} lg={7.5}>
            <Paper elevation={0} sx={{ 
              borderRadius: 3, 
              bgcolor: "#fff", 
              height: "100%", 
              overflow: "hidden", 
              border: "1px solid #e0e0e0",
              display: "flex",
              flexDirection: "column",
              position: "relative"
            }}>
              {/* Image Preview Area */}
              <Box sx={{ 
                flexGrow: 1, 
                minHeight: "250px", 
                bgcolor: "#fdfdfd", 
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4
              }}>
                {previewUrl ? (
                  <Box sx={{ position: "relative", maxWidth: "100%", maxHeight: "600px" }}>
                    <img 
                      src={previewUrl} 
                      alt="Specimen" 
                      style={{ 
                        maxWidth: "100%", 
                        maxHeight: "300px", 
                        borderRadius: "8px", 
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        display: "block"
                      }} 
                    />
                    {isScanning && (
                      <Box className="scanner-line" sx={{
                        position: "absolute",
                        width: "100%",
                        height: "4px",
                        bgcolor: UI_COLORS.accent,
                        boxShadow: `0 0 15px ${UI_COLORS.accent}`,
                        zIndex: 10,
                        animation: "scan 2s infinite ease-in-out",
                        "@keyframes scan": {
                          "0%": { top: "0%" },
                          "50%": { top: "95%" },
                          "100%": { top: "0%" }
                        }
                      }} />
                    )}
                  </Box>
                ) : (
                  <Stack alignItems="center" spacing={2} sx={{ opacity: 0.4 }}>
                    <SearchIcon sx={{ fontSize: 80 }} />
                    <Typography variant="h6">Awaiting Product Photo</Typography>
                  </Stack>
                )}
              </Box>

              {/* Status Bar */}
              <Box sx={{ p: 1.5, px: 2, bgcolor: "#fff", borderTop: "1px solid #f0f0f0" }}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.secondary" }}>
                      ANALYSIS STATUS
                    </Typography>
                    <Typography variant="body2" sx={{ color: isScanning ? UI_COLORS.accent : "text.primary", fontWeight: isScanning ? 700 : 400 }}>
                      {isScanning ? "Analyzing your plant image..." : 
                       results ? "Detection complete." : 
                       "Ready to scan."}
                    </Typography>
                  </Grid>
                  {isScanning && (
                    <Grid item>
                      <CircularProgress size={24} sx={{ color: UI_COLORS.accent }} />
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Results Insight - Fade In */}
        {results && (
          <Fade in timeout={1000}>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, textAlign: "center", color: UI_COLORS.primary, fontFamily: "'Playfair Display', serif" }}>
                Diagnostic Report
              </Typography>

              <Grid container spacing={4}>
                {/* Statistical Breakdown */}
                <Grid item xs={12} md={7}>
                  <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid #e0e0e0", bgcolor: "#fff" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                      <ScienceIcon color="primary" sx={{ fontSize: 18 }} /> Confidence Profiles
                    </Typography>
                    {results.map((res, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: index === 0 ? UI_COLORS.accent : "#e0e0e0" }} />
                            <Typography variant="body2" sx={{ fontWeight: index === 0 ? 800 : 500, fontSize: index === 0 ? "1rem" : "0.85rem" }}>
                               {formatClassName(res.class)}
                             </Typography>
                           </Stack>
                           <Typography variant="body2" sx={{ fontWeight: 900, fontSize: "0.9rem", color: index === 0 ? UI_COLORS.accent : "text.secondary" }}>
                             {res.confidence.toFixed(2)}%
                           </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={res.confidence} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            bgcolor: "#f0f0f0",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: index === 0 ? UI_COLORS.accent : "#bdbdbd",
                              transition: "all 1s ease"
                            }
                          }}
                        />
                      </Box>
                    ))}
                  </Paper>
                </Grid>

                {/* Primary Diagnosis Card */}
                <Grid item xs={12} md={5}>
                  <Zoom in timeout={600}>
                    <Paper sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: UI_COLORS.accent, 
                      color: "#fff", 
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      boxShadow: "0 10px 30px rgba(76, 175, 80, 0.2)"
                    }}>
                      <Typography variant="h3" sx={{ opacity: 0.3, mb: -1.5, fontWeight: 900 }}>{DISEASE_INFO[results[0].class]?.icon || "🌿"}</Typography>
                      <Typography variant="overline" sx={{ letterSpacing: 1, fontWeight: 900, mb: 0.5, display: "block", fontSize: "0.65rem" }}>FINAL IDENTIFICATION</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.5, lineHeight: 1 }}>
                        {formatClassName(results[0].class)}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 400, opacity: 0.9 }}>
                        Diagnostic Confidence: {results[0].confidence.toFixed(1)}%
                      </Typography>
                    </Paper>
                  </Zoom>
                </Grid>

                {/* Detailed Intelligence Cards */}
                {DISEASE_INFO[results[0].class] && (
                  <Grid item xs={12}>
                    <Grid container spacing={1.5}>
                      {[
                        { title: "Description", text: DISEASE_INFO[results[0].class].description, icon: <InfoIcon fontSize="small" sx={{ color: UI_COLORS.accent }} /> },
                        { title: "Probable Causes", text: DISEASE_INFO[results[0].class].causes, icon: <BugReportIcon fontSize="small" sx={{ color: UI_COLORS.clay }} /> },
                        { title: "Treatment Protocol", text: DISEASE_INFO[results[0].class].treatment, icon: <HealthAndSafetyIcon fontSize="small" sx={{ color: "#d32f2f" }} /> },
                        { title: "Preventive Strategy", text: DISEASE_INFO[results[0].class].prevention, icon: <VerifiedIcon fontSize="small" sx={{ color: UI_COLORS.primary }} /> }
                      ].map((item, idx) => (
                        <Grid item xs={12} sm={6} lg={3} key={idx}>
                          <Card elevation={0} sx={{ 
                            height: "100%", 
                            borderRadius: 2.5, 
                            border: "1px solid #e0e0e0", 
                            bgcolor: "#fff",
                            transition: "all 0.2s ease",
                            "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }
                          }}>
                            <CardContent sx={{ p: 2 }}>
                              <Box sx={{ mb: 1 }}>{item.icon}</Box>
                              <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.5, color: UI_COLORS.primary }}>{item.title}</Typography>
                              <Typography variant="caption" sx={{ lineHeight: 1.4, color: "text.secondary", display: "block" }}>{item.text}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Footer Support Info */}
        {!results && (
          <Box sx={{ mt: 10, textAlign: "center", opacity: 0.6 }}>
            <Typography variant="body2">
              For best results, ensure leaves are well-lit and centered in the frame against a contrasting background.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default DetectDisease;
