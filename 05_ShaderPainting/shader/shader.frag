precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vTexCoord;

uniform float time;
uniform float frequency;
uniform float amplitude;
uniform float rotRadius;

// Function to rotate a 2D point around the origin (mouse position)
vec2 rotateUV(vec2 uv, vec2 center, float angle) {
  // Translate to origin (move uv to be relative to the center point)
  uv -= center;
  
  // Apply rotation
  float cosAngle = cos(angle);
  float sinAngle = sin(angle);
  vec2 rotatedUV = vec2(
    uv.x * cosAngle - uv.y * sinAngle,
    uv.x * sinAngle + uv.y * cosAngle
  );
  
  // Translate back to the original position
  return rotatedUV + center;
}

float EaseInOutQuad(float x)
{
   //x < 0.5f ? 2 * x* x : 1 - pow(-2 * x + 2,2) /2;
   float inValue = 2.0 * x  *x;
   float outValue = 1.0- pow(-2.0 * x + 2.0,2.0) / 2.0;
   float inStep = step(inValue,0.5) * inValue;
   float outStep = step(0.5 , outValue ) * outValue;
   
   return inStep + outStep;
}
float random (in float x) {
    return fract(sin(x)*1e4);
}
// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}
// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st, in float mult) {
    st=vec2(st * mult);
    vec2 i = floor(st) ;
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i) ;
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    //u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
  
  vec2 uv = vTexCoord ;
 
  
  // Convert the mouse position to the texture coordinate space
  vec2 mousePos = uMouse ;

  // Define the rotation radius around the mouse
  float rotationRadius = rotRadius; // This defines the area of rotation, in normalized coordinates


  // Compute the distance between the mouse and the current fragment
  float dist = distance(uv, mousePos);

  float n=1.0;
  if (dist < rotationRadius) {
    n = noise(uv, 20.0);
  }

  // Apply a distortion effect (you can play around with this)
  float distortionStrength = 0.1;
  vec2 distortedUV = uv;
  float angle = 0.0; 
   distortedUV = distortedUV + (distortedUV - mousePos) * distortionStrength * EaseInOutQuad(dist * 10.0);
   
  // Set the rotation angle (can be dependent on distance for a smooth effect)
  angle = EaseInOutQuad(-dist * n *20.0);  // Rotation strength based on distance

    
  // Apply rotation only to fragments within the radius
  distortedUV = rotateUV(distortedUV, mousePos, angle);
  
  if (dist < rotationRadius) {
  // Color distortion: Shift RGB channels slightly based on the distance
    vec2 redOffset = distortedUV + vec2(0.01 * dist, 0.0);   // Red shifted slightly horizontally
    vec2 greenOffset = distortedUV + vec2(0.0, -0.01 * dist); // Green shifted slightly vertically
    vec2 blueOffset = distortedUV + vec2(-0.01 * dist, 0.0);  // Blue shifted slightly horizontally
    
    // Sample the texture with the offsets for RGB channels
    vec4 redChannel = texture2D(uTexture, redOffset);
    vec4 greenChannel = texture2D(uTexture, greenOffset);
    vec4 blueChannel = texture2D(uTexture, blueOffset);
 
  // Combine the color channels with their individual offsets
    gl_FragColor = vec4(redChannel.r, greenChannel.g, blueChannel.b, 1.0);
    
  } else {
    // If outside the radius, use the normal distortion without color shifts
    vec4 color = texture2D(uTexture, distortedUV);
    gl_FragColor = color;
  }

 

}
