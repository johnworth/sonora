import React from "react";
import { mockAxios } from "../../axiosMock";
import { UploadTrackingProvider } from "../../../src/contexts/uploadTracking";

import ReferenceGenomes from "../../../src/components/apps/admin/referenceGenomes/ReferenceGenomes";

export default {
    title: "Apps / Ref Genome",
};

export function RefGenomeListingTest(props) {
    const genomesListing = {
        genomes: [
            {
                id: "7f66a989-9bb6-42c4-9db3-0e316304c93e",
                name: "Arabidopsis thaliana [Mouse-ear cress] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Arabidopsis_thaliana.TAIR10/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:15:01.000Z",
            },
            {
                id: "8af62f2b-15fc-4f36-ae04-c6b801d98c1b",
                name: "Vitis vinifera [Wine grape] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Vitis_vinifera.IGGP_12x/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:44:26.000Z",
            },
            {
                id: "2b1154f3-6c10-4707-a5ea-50d6eb890582",
                name: "Zea mays [Maize] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Zea_mays.AGPv2/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:45:13.000Z",
            },
            {
                id: "8683bbe8-c577-42f8-8d9b-1bdd861122ae",
                name: "Brachypodium distachyon [Purple false brome] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Brachypodium_distachyon.v1.0/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:16:29.000Z",
            },
            {
                id: "e21e71f2-219f-4704-a8a6-9ab487a759a6",
                name: "Oryza brachyantha (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Oryza_brachyantha.Oryza_brachyantha.v1.4b/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:34:27.000Z",
            },
            {
                id: "ef269f1a-e561-4f0c-92b7-3d9d8e7362f3",
                name: "Drosophila melanogaster [Fruit fly] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Drosophila_melanogaster.BDGP_5/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:24:53.000Z",
            },
            {
                id: "70a34bd3-a7a4-4c7e-8ff5-36335b3f9b57",
                name: "Saccharomyces cerevisiae [Baker's yeast] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Saccharomyces_cerevisiae.EF_4/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:40:09.000Z",
            },
            {
                id: "9875f6cc-0503-418b-b5cc-8cb8dd44d56d",
                name: "Setaria italica [Foxtail millet] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Setaria_italica.JGIv2.0/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:41:50.000Z",
            },
            {
                id: "f3197615-747d-44c6-bd5f-293cbde95bab",
                name: "Gadus morhua [Atlantic cod] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Gadus_morhua.gadMor1/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:26:13.000Z",
            },
            {
                id: "6149be1b-7aaa-43b4-84df-de2567ab9489",
                name: "Mus musculus [House mouse] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Mus_musculus.NCBIM37/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:33:33.000Z",
            },
            {
                id: "fb44f582-cfa1-455b-a126-3dc13dc30491",
                name: "Saccharomyces cerevisiae [Baker's yeast] (Ensembl 19_72)",
                path: "/data2/collections/genomeservices/1.0.0/19_72/Saccharomyces_cerevisiae.EF_4/de_support/",
                deleted: false,
                created_by: "vaughn@iplantcollaborative.org",
                created_on: "2013-09-10T14:40:48.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:40:48.000Z",
            },
            {
                id: "5a07b999-9237-4325-8dfa-46e84479c1be",
                name: "Aegilops tauschii (Ensembl 19)",
                path: "/data2/collections/genomeservices/1.0.0/19_72/Aegilops_tauschii.ASM34733v1/de_support/",
                deleted: false,
                created_by: "vaughn@iplantcollaborative.org",
                created_on: "2013-09-10T14:14:03.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:14:03.000Z",
            },
            {
                id: "554b3e87-4e09-45dc-8b8c-da9e020f4bf7",
                name: "Brachypodium distachyon [Purple false brome] (Ensembl 19)",
                path: "/data2/collections/genomeservices/1.0.0/19_72/Brachypodium_distachyon.v1.0/de_support/",
                deleted: false,
                created_by: "vaughn@iplantcollaborative.org",
                created_on: "2013-09-08T17:13:07.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:16:45.000Z",
            },
            {
                id: "58a84f5e-3922-43dc-8414-e42b1513be78",
                name: "Physcomitrella patens subsp. patens [Physcomitrella] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Physcomitrella_patens_subsp._patens.ASM242v1/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:38:53.000Z",
            },
            {
                id: "e38b6fae-2e4b-4217-8c1f-6badea3ff7fc",
                name: "Canis lupus familiaris [Dog] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Canis_lupus_familiaris.CanFam_2.0/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:25:10.000Z",
            },
            {
                id: "eb059ac7-ee82-421a-bbc1-12f117366c4a",
                name: "Danio rerio [Zebrafish] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Danio_rerio.Zv9/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:25:22.000Z",
            },
            {
                id: "1e1c62e5-bd56-4cfa-b3ab-aa6a1496d3e5",
                name: "Solanum lycopersicum [Tomato] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Solanum_lycopersicum.SL2.40/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:42:20.000Z",
            },
            {
                id: "826f0934-69a5-401d-8b5f-36da33fc520e",
                name: "Glycine max [Soybean] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Glycine_max.V1.0/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:26:43.000Z",
            },
            {
                id: "46f9d53d-36b6-4bd9-b4f2-ff952833103f",
                name: "Oryza sativa Indica Group [Indica rice] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Oryza_sativa_Indica_Group.ASM465v1/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:35:33.000Z",
            },
            {
                id: "a55701bc-44e6-4661-bc3a-888ca1febaed",
                name: "Pan troglodytes [Chimpanzee] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Pan_troglodytes.CHIMP2.1.4/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:36:45.000Z",
            },
            {
                id: "f772929d-0ba3-4432-8623-7a74bf2720aa",
                name: "Meleagris gallopavo [Domestic turkey] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Meleagris_gallopavo.Turkey_2.01/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:33:04.000Z",
            },
            {
                id: "41149e71-4328-4391-b1d2-25fdbdca5a54",
                name: "Felis catus [Domestic cat] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Felis_catus.CAT/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:25:57.000Z",
            },
            {
                id: "7e5eff7b-35fa-4635-806c-06ef5ef50db4",
                name: "Oryza glaberrima [African rice] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Oryza_glaberrima.AGI1.1/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:34:58.000Z",
            },
            {
                id: "443befdd-c7ed-4b33-ac67-56a6748d7a48",
                name: "Tursiops truncatus [Bottlenosed dolphin] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Tursiops_truncatus.turTru1/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:44:12.000Z",
            },
            {
                id: "2d748e14-47f5-4a91-bc67-214787ad0843",
                name: "Caenorhabditis elegans [C.elegans] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Caenorhabditis_elegans.WBcel215/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:22:21.000Z",
            },
            {
                id: "2c967e76-9b8a-4a3b-aa30-2e7de3a0a952",
                name: "Sorghum bicolor [Sorghum] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Sorghum_bicolor.Sorbi1/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:43:15.000Z",
            },
            {
                id: "bb5317ce-ad00-466b-8109-432c117c0781",
                name: "Sus scrofa [Pig] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Sus_scrofa.Sscrofa10.2/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:43:40.000Z",
            },
            {
                id: "ba3d662f-0f71-45fa-83a3-7a80b9bb2b3f",
                name: "Xenopus tropicalis [Western clawed frog] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Xenopus_tropicalis.JGI_4.2/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:44:54.000Z",
            },
            {
                id: "72de2532-bdf6-46b3-bffa-6c4860d63813",
                name: "Bos taurus [Cattle] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Bos_taurus.UMD3.1/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:16:11.000Z",
            },
            {
                id: "999a1d22-d2d8-4845-b685-da6403e9016e",
                name: "Cyanidioschyzon merolae strain 10D [Cyanidioschyzon merolae] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Cyanidioschyzon_merolae_strain_10D.ASM9120v1/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:23:46.000Z",
            },
            {
                id: "80aa0d1a-f32c-439a-940d-c9a6d629ed43",
                name: "Populus trichocarpa [Western balsam poplar] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Populus_trichocarpa.JGI2.0/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:39:23.000Z",
            },
            {
                id: "72facaa7-ba29-49ee-b184-42ba3c015ca4",
                name: "Equus caballus [Horse] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Equus_caballus.Equ_Cab_2/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:25:42.000Z",
            },
            {
                id: "e4785abc-f1e7-4d71-9ae6-bff4f2b4613b",
                name: "Oreochromis niloticus [Nile tilapia] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Oreochromis_niloticus.Orenil1.0/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:34:07.000Z",
            },
            {
                id: "18027404-d09f-41bf-99a4-74197ce0e7bf",
                name: "Rattus norvegicus [Norway rat] (Ensembl 14_67)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Rattus_norvegicus.RGSC_3.4/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:39:53.000Z",
            },
            {
                id: "4bb9856a-43da-4f67-bdf9-f90916b4c11f",
                name: "Arabidopsis lyrata subsp. lyrata [Lyre-leaved rock-cress] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Arabidopsis_lyrata_subsp._lyrata.v.1.0/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:14:23.000Z",
            },
            {
                id: "0876c503-9634-488b-9584-ac6c0d565b8d",
                name: "Oryza sativa [Japonica rice] (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Oryza_sativa.MSU6/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:36:07.000Z",
            },
            {
                id: "bdc96014-9b89-4dbc-9376-bc4805d9c1dd",
                name: "Selaginella moellendorffii (Ensembl 14)",
                path: "/data2/collections/genomeservices/1.0.0/14_67/Selaginella_moellendorffii.v1.0/de_support/",
                deleted: false,
                created_by: "<public>",
                created_on: "2012-09-06T16:14:08.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:41:18.000Z",
            },
            {
                id: "6afd5a93-db69-4015-92ca-ed8a7856806c",
                name: "Arabidopsis thaliana [Mouse-ear cress] (Ensembl 19)",
                path: "/data2/collections/genomeservices/1.0.0/19_72/Arabidopsis_thaliana.TAIR10/de_support/",
                deleted: false,
                created_by: "vaughn@iplantcollaborative.org",
                created_on: "2013-09-08T17:12:17.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:15:20.000Z",
            },
            {
                id: "8a038251-e1f8-4987-ba2b-35fab963efc7",
                name: "Musa acuminata (Ensembl 19)",
                path: "/data2/collections/genomeservices/1.0.0/19_72/Musa_acuminata.MA1/de_support/",
                deleted: false,
                created_by: "vaughn@iplantcollaborative.org",
                created_on: "2013-09-08T17:16:52.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:33:15.000Z",
            },
            {
                id: "7af885a9-7c8e-4d4a-99f3-f0ca938f22d2",
                name: "Oryza brachyantha (Ensembl 19)",
                path: "/data2/collections/genomeservices/1.0.0/19_72/Oryza_brachyantha.Oryza_brachyantha.v1.4b/de_support/",
                deleted: false,
                created_by: "vaughn@iplantcollaborative.org",
                created_on: "2013-09-08T17:17:48.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:34:41.000Z",
            },
            {
                id: "c311b613-6cc9-4b88-8423-784e65cf2f3a",
                name: "Selaginella moellendorffii (Ensembl 19)",
                path: "/data2/collections/genomeservices/1.0.0/19_72/Selaginella_moellendorffii.v1.0/de_support/",
                deleted: false,
                created_by: "vaughn@iplantcollaborative.org",
                created_on: "2013-09-08T17:20:52.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:41:32.000Z",
            },
            {
                id: "67d53e94-8120-40e8-b2cc-be161b3a4c07",
                name: "Schizosaccharomyces pombe 972h- (Ensembl 19)",
                path: "/data2/collections/genomeservices/1.0.0/19_72/Schizosaccharomyces_pombe_972h-.ASM294v2/de_support/",
                deleted: false,
                created_by: "vaughn@iplantcollaborative.org",
                created_on: "2013-09-10T14:41:01.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:41:01.000Z",
            },
            {
                id: "728047d4-3754-4ddf-9827-2594a3d5a5be",
                name: "Arabidopsis lyrata subsp. lyrata [Lyre-leaved rock-cress] (Ensembl 19)",
                path: "/data2/collections/genomeservices/1.0.0/19_72/Arabidopsis_lyrata_subsp._lyrata.v.1.0/de_support/",
                deleted: false,
                created_by: "vaughn@iplantcollaborative.org",
                created_on: "2013-09-08T17:11:39.000Z",
                last_modified_by: "vaughn@iplantcollaborative.org",
                last_modified_on: "2013-09-10T14:14:41.000Z",
            },
        ],
    };
    mockAxios
        .onGet("/api/reference-genomes?deleted=true")
        .reply(200, genomesListing);
    return (
        <UploadTrackingProvider>
            <ReferenceGenomes baseId="refGenomes" />
        </UploadTrackingProvider>
    );
}
