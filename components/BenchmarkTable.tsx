const BenchmarkTable = () => {
  return (
    <div className="my-6 w-full overflow-y-auto p-12">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Benchmarks</h1>
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <th className="border px-4 py-2 text-left font-bold">Dataset</th>
            <th className="border px-4 py-2 text-left font-bold">
              Atelectasis
            </th>
            <th className="border px-4 py-2 text-left font-bold">
              Cardiomegaly
            </th>
            <th className="border px-4 py-2 text-left font-bold">
              Consolidation
            </th>
            <th className="border px-4 py-2 text-left font-bold">Edema</th>
            <th className="border px-4 py-2 text-left font-bold">Effusion</th>
            <th className="border px-4 py-2 text-left font-bold">Emphysema</th>
            <th className="border px-4 py-2 text-left font-bold">Fibrosis</th>
            <th className="border px-4 py-2 text-left font-bold">Fracture</th>
            <th className="border px-4 py-2 text-left font-bold">Hernia</th>
            <th className="border px-4 py-2 text-left font-bold">
              Infiltration
            </th>
            <th className="border px-4 py-2 text-left font-bold">
              Lung Opacity
            </th>
            <th className="border px-4 py-2 text-left font-bold">Mass</th>
            <th className="border px-4 py-2 text-left font-bold">Nodule</th>
            <th className="border px-4 py-2 text-left font-bold">
              Pleural Thickening
            </th>
            <th className="border px-4 py-2 text-left font-bold">Pneumonia</th>
            <th className="border px-4 py-2 text-left font-bold">
              Pneumothorax
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left">NIH ChestX-ray14</td>
            <td className="border px-4 py-2 text-left">0.76</td>
            <td className="border px-4 py-2 text-left">0.88</td>
            <td className="border px-4 py-2 text-left">0.77</td>
            <td className="border px-4 py-2 text-left">0.85</td>
            <td className="border px-4 py-2 text-left">0.85</td>
            <td className="border px-4 py-2 text-left">0.73</td>
            <td className="border px-4 py-2 text-left">0.72</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.91</td>
            <td className="border px-4 py-2 text-left">0.68</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.80</td>
            <td className="border px-4 py-2 text-left">0.69</td>
            <td className="border px-4 py-2 text-left">0.74</td>
            <td className="border px-4 py-2 text-left">0.71</td>
            <td className="border px-4 py-2 text-left">0.75</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left">Google</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.74</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.92</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.85</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left">RSNA</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.88</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.86</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left">SIIM</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.79</td>
            <td className="border px-4 py-2 text-left">0.79</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left">PadChest</td>
            <td className="border px-4 py-2 text-left">0.77</td>
            <td className="border px-4 py-2 text-left">0.93</td>
            <td className="border px-4 py-2 text-left">0.88</td>
            <td className="border px-4 py-2 text-left">0.97</td>
            <td className="border px-4 py-2 text-left">0.95</td>
            <td className="border px-4 py-2 text-left">0.87</td>
            <td className="border px-4 py-2 text-left">0.94</td>
            <td className="border px-4 py-2 text-left">0.70</td>
            <td className="border px-4 py-2 text-left">0.96</td>
            <td className="border px-4 py-2 text-left">0.85</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.85</td>
            <td className="border px-4 py-2 text-left">0.85</td>
            <td className="border px-4 py-2 text-left">0.79</td>
            <td className="border px-4 py-2 text-left">0.82</td>
            <td className="border px-4 py-2 text-left">0.81</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left">VinBrain</td>
            <td className="border px-4 py-2 text-left">0.67</td>
            <td className="border px-4 py-2 text-left">0.90</td>
            <td className="border px-4 py-2 text-left">0.93</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.87</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.86</td>
            <td className="border px-4 py-2 text-left">0.85</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.84</td>
            <td className="border px-4 py-2 text-left">0.93</td>
            <td className="border px-4 py-2 text-left">0.93</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left">CheXpert</td>
            <td className="border px-4 py-2 text-left">0.91</td>
            <td className="border px-4 py-2 text-left">0.91</td>
            <td className="border px-4 py-2 text-left">0.90</td>
            <td className="border px-4 py-2 text-left">0.92</td>
            <td className="border px-4 py-2 text-left">0.94</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.74</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.87</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.84</td>
            <td className="border px-4 py-2 text-left">0.85</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left">MIMIC-CXR</td>
            <td className="border px-4 py-2 text-left">0.88</td>
            <td className="border px-4 py-2 text-left">0.88</td>
            <td className="border px-4 py-2 text-left">0.91</td>
            <td className="border px-4 py-2 text-left">0.92</td>
            <td className="border px-4 py-2 text-left">0.92</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.86</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">N/A</td>
            <td className="border px-4 py-2 text-left">0.82</td>
            <td className="border px-4 py-2 text-left">0.81</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BenchmarkTable;
