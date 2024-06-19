package com.example.todoappdeel3.dto;

import java.util.List;

public class DeleteVariantOptionsDTO {

    public List<Long> variant_ids;

    public List<Long> option_ids;

    public DeleteVariantOptionsDTO(List<Long> variant_ids, List<Long> option_ids) {
        this.variant_ids = variant_ids;
        this.option_ids = option_ids;
    }


}
